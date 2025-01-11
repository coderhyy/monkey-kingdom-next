"use client";

import { clusterApiUrl, Connection } from "@solana/web3.js";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

export enum ClusterNetwork {
  Custom = "custom",
  Devnet = "devnet",
  Mainnet = "mainnet-beta",
  Testnet = "testnet",
}

export interface Cluster {
  active?: boolean;
  endpoint: string;
  name: string;
  network?: ClusterNetwork;
}

// By default, we don't configure the mainnet-beta cluster
// The endpoint provided by clusterApiUrl('mainnet-beta') does not allow access from the browser due to CORS restrictions
// To use the mainnet-beta cluster, provide a custom endpoint
export const defaultClusters: Cluster[] = [
  {
    endpoint: clusterApiUrl(ClusterNetwork.Devnet),
    name: ClusterNetwork.Devnet,
    network: ClusterNetwork.Devnet,
  },
  { endpoint: "http://localhost:8899", name: "local" },
  {
    endpoint: clusterApiUrl(ClusterNetwork.Testnet),
    name: ClusterNetwork.Testnet,
    network: ClusterNetwork.Testnet,
  },
];

export interface ClusterProviderContext {
  addCluster: (cluster: Cluster) => void;
  cluster: Cluster;
  clusters: Cluster[];
  deleteCluster: (cluster: Cluster) => void;
  getExplorerUrl(path: string): string;
  setCluster: (cluster: Cluster) => void;
}

const Context = createContext<ClusterProviderContext>(
  {} as ClusterProviderContext
);

export function ClusterProvider({ children }: { children: React.ReactNode }) {
  // 可以存到 localstorage
  const [cluster, setCluster] = useState(defaultClusters[0]);
  const [clusters, setClusters] = useState(defaultClusters);

  const value: ClusterProviderContext = {
    addCluster: (cluster: Cluster) => {
      try {
        new Connection(cluster.endpoint);
        setClusters([...clusters, cluster]);
      } catch (err) {
        toast.error(`${err}`);
      }
    },
    cluster,
    clusters: clusters.sort((a, b) => (a.name > b.name ? 1 : -1)),
    deleteCluster: (cluster: Cluster) => {
      setClusters(clusters.filter((item) => item.name !== cluster.name));
    },
    getExplorerUrl: (path: string) =>
      `https://explorer.solana.com/${path}${getClusterUrlParam(cluster)}`,
    setCluster: (cluster: Cluster) => setCluster(cluster),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCluster() {
  return useContext(Context);
}

function getClusterUrlParam(cluster: Cluster): string {
  let suffix = "";
  switch (cluster.network) {
    case ClusterNetwork.Devnet:
      suffix = "devnet";
      break;
    case ClusterNetwork.Mainnet:
      suffix = "";
      break;
    case ClusterNetwork.Testnet:
      suffix = "testnet";
      break;
    default:
      suffix = `custom&customUrl=${encodeURIComponent(cluster.endpoint)}`;
      break;
  }

  return suffix.length ? `?cluster=${suffix}` : "";
}
