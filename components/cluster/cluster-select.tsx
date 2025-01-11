import { DropdownMenu } from "../ui/dropdown-menu";
import { useCluster } from "./cluster-provider";

export function ClusterSelect() {
  const { cluster, clusters, setCluster } = useCluster();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{cluster.name}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {clusters.map((cluster) => (
          <DropdownMenu.Item
            key={cluster.name}
            onClick={() => setCluster(cluster)}
          >
            {cluster.name}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
