"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DiscountCodeType } from "@prisma/client";
import { addDiscountCode } from "../../_actions/discountCodes";
import { Checkbox } from "@/components/ui/checkbox";

export function DiscountCodeForm({
  products,
}: {
  products: { name: string; id: string }[];
}) {
  const [error, action] = useFormState(addDiscountCode, {});
  const [allPoducts, setAllProducts] = useState(true);
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="code">Code</Label>
        <Input type="text" id="code" name="code" required />
        {error.code && <div className="text-destructive">{error.code}</div>}
      </div>
      <div className="space-y-2 flex gap-8 items-baseline">
        <div className="space-y-2">
          <Label htmlFor="discountType">Discount Type</Label>
          <RadioGroup
            id="discountType"
            name="discountType"
            defaultValue={DiscountCodeType.PERCENTAGE}
          >
            <div className="flex gap-2 items-center">
              <RadioGroupItem
                id="percentage"
                value={DiscountCodeType.PERCENTAGE}
              />
              <Label htmlFor="percentage">Percentage</Label>
            </div>
            <div className="flex gap-2 items-center">
              <RadioGroupItem id="fixed" value={DiscountCodeType.FIXED} />
              <Label htmlFor="fixed">Fixed</Label>
            </div>
          </RadioGroup>
          {error.discountType && (
            <div className="text-destructive">{error.discountType}</div>
          )}
        </div>
        <div className="space-y-2 flex-grow">
          <Label htmlFor="discountAmount">Discount Amout</Label>
          <Input
            type="number"
            id="discountAmount"
            name="discountAmount"
            required
          />
          {error.discountAmount && (
            <div className="text-destructive">{error.discountAmount}</div>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="limit">Limit</Label>
        <Input type="number" id="limit" name="limit" />
        <div className="text-muted-foreground">
          Leave blank for infinite uses
        </div>
        {error.limit && <div className="text-destructive">{error.limit}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="expiresAt">Expiration</Label>
        <Input
          className="w-max"
          type="datetime-local"
          id="expiresAt"
          name="expiresAt"
          min={today.toJSON().split(":").slice(0, -1).join(":")}
        />
        <div className="text-muted-foreground">
          Leave blank for no expiration
        </div>
        {error.expiresAt && (
          <div className="text-destructive">{error.expiresAt}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label>Allowed Products</Label>
        {error.allProducts && (
          <div className="text-destructive">{error.allProducts}</div>
        )}
        {error.productIds && (
          <div className="text-destructive">{error.productIds}</div>
        )}
        <div className="flex gap-2 items-center">
          <Checkbox
            id="allProducts"
            name="allProducts"
            checked={allPoducts}
            onCheckedChange={(e) => setAllProducts(e === true)}
          />
          <Label htmlFor="allProducts">All Products</Label>
        </div>
        {products.map((product) => (
          <div className="flex gap-2 items-center" key={product.id}>
            <Checkbox
              id={product.id}
              name="productIds"
              disabled={allPoducts}
              value={product.id}
            />
            <Label htmlFor={product.id}>{product.name}</Label>
          </div>
        ))}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
