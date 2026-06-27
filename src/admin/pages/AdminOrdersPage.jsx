import { useMemo, useState } from "react";
import { useOrdersQuery, useUpdateOrderStatus } from "@/features/shop/use-shop-queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Ban,
  CheckCircle2,
  ExternalLink,
  ImageOff,
  Loader2,
  MapPin,
  MessageCircle,
  RefreshCw,
  RotateCcw,
  Search,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";

/** Build a WhatsApp deep-link pre-filled with order details. */
function buildWhatsAppUrl(order) {
  const phone = (order.customer?.phone ?? "").replace(/\D/g, "");
  if (!phone) return null;

  const items = (order.items ?? [])
    .map((i) => `• ${i.name} × ${i.quantity}`)
    .join("\n");

  const addressLine1 = order.customer?.address ?? "";
  const addressLine2 = [order.customer?.city, order.customer?.pincode]
    .filter(Boolean)
    .join(", ");

  const addressBlock = [addressLine1, addressLine2].filter(Boolean).join("\n");

  const lines = [
    `Hi! Your order *${order.id}* has been successfully verified and confirmed.`,
    "",
    "*Items:*",
    items,
    "",
    `*Total:* \u20B9${order.total}`,
  ];

  if (addressBlock) {
    lines.push("", "*Shipping Address:*", addressBlock);
  }

  lines.push(
    "",
    "Your order is now being processed and will be dispatched shortly."
  );

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

const STATUS_STYLES = {
  pending_review: "bg-amber-50 text-orange-700 border border-amber-500 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40",
  confirmed:      "bg-emerald-50 text-green-700 border border-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40",
  cancelled:      "bg-red-500 text-white border border-red-600 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/40",
  returned:       "bg-violet-50 text-violet-700 border border-violet-500 dark:bg-violet-500/20 dark:text-violet-300 dark:border-violet-500/40",
};

const STATUS_LABEL = {
  pending_review: "Pending review",
  confirmed:      "Confirmed",
  cancelled:      "Cancelled",
  returned:       "Returned",
};

function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"
      )}
    >
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

function OrderCard({ order, expanded, onToggle, onConfirm, confirmingId, onCancel, cancellingId, onReturn, returningId }) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-premium-sm">
      {/* Summary row */}
      <button
        type="button"
        className="flex w-full flex-wrap items-start gap-3 px-5 py-4 text-left sm:items-center"
        onClick={onToggle}
      >
        <div className="min-w-0 flex-1 space-y-0.5">
          <p className="font-mono text-sm font-semibold text-foreground">{order.id}</p>
          <p className="text-sm font-medium">{order.customer?.phone || "—"}</p>
          {order.customer?.email && (
            <p className="text-xs text-muted-foreground">{order.customer.email}</p>
          )}
          {(order.customer?.city || order.customer?.pincode) && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3 shrink-0" aria-hidden />
              {[order.customer?.city, order.customer?.pincode].filter(Boolean).join(" – ")}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5 text-right">
          <span className="font-bold tabular-nums">{formatCurrency(order.total)}</span>
          <StatusBadge status={order.status} />
          <span className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</span>
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-border px-5 pb-5 pt-4">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Items */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Items
              </p>
              <ul className="space-y-2">
                {(order.items ?? []).map((item, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 text-sm">
                    <span className="min-w-0 truncate font-medium">{item.name}</span>
                    <span className="shrink-0 tabular-nums text-muted-foreground">
                      {formatCurrency(item.price)} × {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-bold">
                <span>Total</span>
                <span className="tabular-nums">{formatCurrency(order.total)}</span>
              </div>

              {/* Address */}
              {(order.customer?.address || order.customer?.city) && (
                <div className="mt-4 rounded-xl border border-border bg-muted/30 p-3">
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <MapPin className="size-3.5" aria-hidden />
                    Delivery address
                  </p>
                  {order.customer?.address && (
                    <p className="text-sm">{order.customer.address}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {[order.customer?.city, order.customer?.pincode].filter(Boolean).join(" – ")}
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="mt-4 flex flex-wrap gap-2">
                {order.status === "pending_review" && (
                  <Button
                    type="button"
                    size="sm"
                    className="gap-2 rounded-full"
                    disabled={confirmingId === order.id || cancellingId === order.id}
                    onClick={(e) => { e.stopPropagation(); onConfirm(order.id); }}
                  >
                    {confirmingId === order.id ? (
                      <Loader2 className="size-3.5 animate-spin" aria-hidden />
                    ) : (
                      <CheckCircle2 className="size-3.5" aria-hidden />
                    )}
                    {confirmingId === order.id ? "Confirming…" : "Mark as confirmed"}
                  </Button>
                )}
                {order.status === "confirmed" && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="gap-2 rounded-full border-violet-400/50 text-violet-700 hover:bg-violet-50 dark:text-violet-300 dark:hover:bg-violet-500/10"
                    disabled={returningId === order.id || cancellingId === order.id}
                    onClick={(e) => { e.stopPropagation(); onReturn(order.id); }}
                  >
                    {returningId === order.id ? (
                      <Loader2 className="size-3.5 animate-spin" aria-hidden />
                    ) : (
                      <RotateCcw className="size-3.5" aria-hidden />
                    )}
                    {returningId === order.id ? "Processing…" : "Return"}
                  </Button>
                )}
                {order.status !== "cancelled" && order.status !== "returned" && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="gap-2 rounded-full border-destructive/40 text-destructive hover:bg-destructive/10"
                    disabled={cancellingId === order.id || confirmingId === order.id}
                    onClick={(e) => { e.stopPropagation(); onCancel(order.id); }}
                  >
                    {cancellingId === order.id ? (
                      <Loader2 className="size-3.5 animate-spin" aria-hidden />
                    ) : (
                      <Ban className="size-3.5" aria-hidden />
                    )}
                    {cancellingId === order.id ? "Cancelling…" : "Cancel order"}
                  </Button>
                )}
                {buildWhatsAppUrl(order) && (
                  <a
                    href={buildWhatsAppUrl(order)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1ebe5d]"
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    Chat on WhatsApp
                  </a>
                )}
              </div>
            </div>

            {/* Screenshot */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Payment screenshot
              </p>
              {order.screenshotUrl ? (
                <a
                  href={order.screenshotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block"
                >
                  <img
                    src={order.screenshotUrl}
                    alt="Payment screenshot"
                    className="max-h-48 w-auto rounded-xl border border-border object-contain shadow-md transition group-hover:opacity-90"
                  />
                  <span className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
                    <ExternalLink className="size-3" aria-hidden />
                    Open
                  </span>
                </a>
              ) : (
                <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
                  <ImageOff className="size-5 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderList({ orders, search, expanded, onToggle, onConfirm, confirmingId, onCancel, cancellingId, onReturn, returningId, emptyLabel }) {
  const filtered = useMemo(() => {
    const q = search.trim().toUpperCase();
    if (!q) return orders;
    return orders.filter((o) => o.id.toUpperCase().includes(q));
  }, [orders, search]);

  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-14 text-center">
        <ShoppingBag className="mx-auto size-7 text-muted-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filtered.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          expanded={expanded === order.id}
          onToggle={() => onToggle(order.id)}
          onConfirm={onConfirm}
          confirmingId={confirmingId}
          onCancel={onCancel}
          cancellingId={cancellingId}
          onReturn={onReturn}
          returningId={returningId}
        />
      ))}
    </div>
  );
}

export function AdminOrdersPage() {
  const { data: orders = [], isLoading, isError, error, refetch, isFetching } = useOrdersQuery();
  const updateStatus = useUpdateOrderStatus();

  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [confirmingId, setConfirmingId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [returningId, setReturningId] = useState(null);

  const pending   = useMemo(() => orders.filter((o) => o.status === "pending_review"), [orders]);
  const confirmed = useMemo(() => orders.filter((o) => o.status === "confirmed"), [orders]);
  const cancelled = useMemo(() => orders.filter((o) => o.status === "cancelled"), [orders]);
  const returned  = useMemo(() => orders.filter((o) => o.status === "returned"), [orders]);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  const onConfirm = async (orderId) => {
    setConfirmingId(orderId);
    try {
      await updateStatus.mutateAsync({ orderId, status: "confirmed" });
      toast.success(`Order ${orderId} confirmed`);
    } catch (err) {
      toast.error("Could not update order", { description: err.message });
    } finally {
      setConfirmingId(null);
    }
  };

  const onCancel = async (orderId) => {
    setCancellingId(orderId);
    try {
      await updateStatus.mutateAsync({ orderId, status: "cancelled" });
      toast.success(`Order ${orderId} cancelled`);
    } catch (err) {
      toast.error("Could not cancel order", { description: err.message });
    } finally {
      setCancellingId(null);
    }
  };

  const onReturn = async (orderId) => {
    setReturningId(orderId);
    try {
      await updateStatus.mutateAsync({ orderId, status: "returned" });
      toast.success(`Order ${orderId} marked as returned`);
    } catch (err) {
      toast.error("Could not mark return", { description: err.message });
    } finally {
      setReturningId(null);
    }
  };

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-6 text-center" role="alert">
        <p className="text-sm text-destructive">{error?.message || "Could not load orders."}</p>
        <Button type="button" variant="outline" size="sm" className="mt-4 rounded-md" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isLoading
              ? "Loading…"
              : `${orders.length} order${orders.length !== 1 ? "s" : ""} — ${pending.length} pending, ${confirmed.length} completed, ${returned.length} returned`}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 rounded-md"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={cn("size-3.5", isFetching && "animate-spin")} aria-hidden />
          Refresh
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          placeholder="Search by order ID (e.g. 24S-A3F9B2)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl border border-border bg-muted/40" />
          ))}
        </div>
      )}

      {/* Tabs */}
      {!isLoading && (
        <Tabs defaultValue="pending">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">
              Pending
              {pending.length > 0 && (
                <span className="ml-2 rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                  {pending.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
              {confirmed.length > 0 && (
                <span className="ml-2 rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  {confirmed.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled
              {cancelled.length > 0 && (
                <span className="ml-2 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-bold text-red-700 dark:bg-red-900/40 dark:text-red-400">
                  {cancelled.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="returns">
              Returns
              {returned.length > 0 && (
                <span className="ml-2 rounded-full bg-violet-100 px-1.5 py-0.5 text-xs font-bold text-violet-700 dark:bg-violet-900/40 dark:text-violet-400">
                  {returned.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <OrderList
              orders={pending}
              search={search}
              expanded={expanded}
              onToggle={toggle}
              onConfirm={onConfirm}
              confirmingId={confirmingId}
              onCancel={onCancel}
              cancellingId={cancellingId}
              onReturn={onReturn}
              returningId={returningId}
              emptyLabel={search ? "No pending orders match that ID." : "No pending orders."}
            />
          </TabsContent>

          <TabsContent value="completed">
            <OrderList
              orders={confirmed}
              search={search}
              expanded={expanded}
              onToggle={toggle}
              onConfirm={onConfirm}
              confirmingId={confirmingId}
              onCancel={onCancel}
              cancellingId={cancellingId}
              onReturn={onReturn}
              returningId={returningId}
              emptyLabel={search ? "No completed orders match that ID." : "No completed orders yet."}
            />
          </TabsContent>

          <TabsContent value="cancelled">
            <OrderList
              orders={cancelled}
              search={search}
              expanded={expanded}
              onToggle={toggle}
              onConfirm={onConfirm}
              confirmingId={confirmingId}
              onCancel={onCancel}
              cancellingId={cancellingId}
              onReturn={onReturn}
              returningId={returningId}
              emptyLabel={search ? "No cancelled orders match that ID." : "No cancelled orders."}
            />
          </TabsContent>

          <TabsContent value="returns">
            <OrderList
              orders={returned}
              search={search}
              expanded={expanded}
              onToggle={toggle}
              onConfirm={onConfirm}
              confirmingId={confirmingId}
              onCancel={onCancel}
              cancellingId={cancellingId}
              onReturn={onReturn}
              returningId={returningId}
              emptyLabel={search ? "No returns match that ID." : "No returned orders yet."}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
