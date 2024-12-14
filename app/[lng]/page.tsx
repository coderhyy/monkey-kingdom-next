import Balance from "./components/balance";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold">Welcome to the Kingdom!</h1>
      <p>
        Inspired by the beloved tale Journey to the West, Monkey Kingdom brings
        to life the legend of Sun Wukong in NFT form.
      </p>
      <Balance />
    </>
  );
}
