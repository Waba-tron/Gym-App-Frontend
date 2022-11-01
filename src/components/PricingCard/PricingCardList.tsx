import { Key } from "react";
import PricingCard from "./PricingCard";

interface pricesListProps {
  prices: any;
}

const PricingCardList = ({ prices }: pricesListProps) => {
  return (
    <div className="flex space-x-8 mt-5">
      {prices
        .sort(
          (
            a: { default_price: { unit_amount: number } },
            b: { default_price: { unit_amount: number } }
          ) => a.default_price.unit_amount - b.default_price.unit_amount
        )
        .map((priceCard: { name: Key | null | undefined }) => (
          <PricingCard key={priceCard.name} priceCard={priceCard} />
        ))}
    </div>
  );
};

export default PricingCardList;
