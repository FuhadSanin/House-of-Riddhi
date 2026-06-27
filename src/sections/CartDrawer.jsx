import { Loader2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  calculateOrderTotals,
  calculateSubtotal,
  formatInr,
} from "@/lib/shipping";

function formatCurrency(value) {
  return formatInr(value);
}

/** Editable quantity input — shows the current qty, lets user type a new value. */
function QuantityInput({ itemId, quantity, onIncrement, onDecrement, onSetQuantity, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const startEdit = () => {
    setDraft(String(quantity));
    setEditing(true);
  };

  const commitEdit = () => {
    const n = parseInt(draft, 10);
    if (!isNaN(n) && n > 0) {
      onSetQuantity(itemId, n);
    } else if (!isNaN(n) && n <= 0) {
      onRemove(itemId);
    }
    setEditing(false);
  };

  return (
    <div className="inline-flex items-center rounded-full border border-border">
      <button
        className="p-1.5 text-muted-foreground hover:text-foreground"
        onClick={() => onDecrement(itemId)}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </button>

      {editing ? (
        <input
          type="number"
          min="0"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => { if (e.key === "Enter") commitEdit(); if (e.key === "Escape") setEditing(false); }}
          className="w-10 bg-transparent text-center text-sm font-semibold outline-none tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          autoFocus
        />
      ) : (
        <button
          className="min-w-8 text-center text-sm font-semibold tabular-nums hover:text-primary"
          onClick={startEdit}
          aria-label={`Quantity ${quantity}, click to edit`}
          title="Click to type a quantity"
        >
          {quantity}
        </button>
      )}

      <button
        className="p-1.5 text-muted-foreground hover:text-foreground"
        onClick={() => onIncrement(itemId)}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export function CartDrawer({
  isOpen,
  items,
  total,
  isCheckingOut,
  checkoutStatus,
  onClose,
  onIncrement,
  onDecrement,
  onSetQuantity,
  onRemove,
  onCheckout,
}) {
  const subtotal = calculateSubtotal(items);
  const { shippingFee, total: grandTotal, freeShippingEligible, amountForFreeShipping } =
    calculateOrderTotals({ subtotal });

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/45 transition-opacity ${isOpen ? "z-[100] opacity-100" : "z-30 pointer-events-none opacity-0"}`}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 h-full w-full max-w-md transform border-l border-border/50 bg-background/95 p-5 shadow-premium backdrop-blur-2xl transition-transform duration-500 ease-out sm:p-6 ${
          isOpen ? "z-[100]" : "z-30"
        } ${
          isOpen
            ? "translate-x-0 pointer-events-auto"
            : "pointer-events-none translate-x-full"
        }`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        {/* Gold accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-2xl font-semibold text-foreground">Your Cart</h3>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
              House of Riddhi
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close cart" className="rounded-full hover:bg-primary/8">
            <X className="text-maroon" />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="mt-14 rounded-3xl border border-dashed border-gold/20 bg-gold/4 p-7 text-center">
            <ShoppingBag className="mx-auto size-8 text-gold opacity-60" />
            <p className="mt-3 font-display text-base text-muted-foreground">Your cart is empty.</p>
            <p className="mt-1 text-sm text-muted-foreground">Add a beautiful saree to get started.</p>
          </div>
        ) : (
          <>
            <div className="mt-6 space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "56vh" }}>
              {items.map((item) => (
                <article key={item.id} className="rounded-2xl border border-border/60 bg-card p-3 shadow-premium-sm">
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                      width={64}
                      height={64}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <QuantityInput
                          itemId={item.id}
                          quantity={item.quantity}
                          onIncrement={onIncrement}
                          onDecrement={onDecrement}
                          onSetQuantity={onSetQuantity}
                          onRemove={onRemove}
                        />
                        <button
                          className="inline-flex items-center gap-1 text-sm font-medium text-destructive hover:underline"
                          onClick={() => onRemove(item.id)}
                        >
                          <Trash2 className="size-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border/60 bg-card p-4 shadow-premium-sm">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold tabular-nums">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold tabular-nums">
                    {shippingFee === 0 ? "Free" : formatCurrency(shippingFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-2">
                  <span className="font-semibold">Total</span>
                  <span className="text-lg font-bold tabular-nums">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
              {!freeShippingEligible && amountForFreeShipping > 0 ? (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Add {formatCurrency(amountForFreeShipping)} more for free standard shipping.
                </p>
              ) : null}
              <Button className="mt-4 w-full gap-2 rounded-full bg-maroon text-primary-foreground hover:bg-maroon/85" onClick={onCheckout} disabled={isCheckingOut}>
                {isCheckingOut && <Loader2 className="size-4 animate-spin" aria-hidden />}
                Checkout
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                <Link to="/shipping" className="text-maroon underline-offset-4 hover:underline">
                  Shipping & returns policy
                </Link>
              </p>
              {checkoutStatus ? <p className="mt-2 text-xs text-muted-foreground">{checkoutStatus}</p> : null}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
