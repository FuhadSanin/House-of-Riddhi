import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { IMG } from "@/sections/data";
import { ExternalLink, Home, LayoutGrid, LogOut, ShoppingBag, Tag, Users } from "lucide-react";
import { CategoriesModal } from "@/admin/components/CategoriesModal";
import { useAuth } from "@/features/auth/AuthContext";
import { toast } from "sonner";

const navLinkClass = ({ isActive }) =>
  cn(
    "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
    isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"
  );

function userInitials(user) {
  if (user?.displayName) {
    return user.displayName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
  return user?.email?.[0]?.toUpperCase() ?? "A";
}

export function AdminLayout() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const onSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/admin/login", { replace: true });
  };

  return (
    <section className="min-h-screen bg-muted/30 font-sans dark:bg-background">
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <Link
                to="/"
                className="inline-flex shrink-0 items-center rounded-md text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="House of Riddhi — home"
              >
                <img
                  src={IMG.logo}
                  alt="House of Riddhi logo"
                  className="h-24 w-auto max-h-28 object-contain object-left sm:h-28"
                  decoding="async"
                />
              </Link>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Administration</p>
                <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground">House of Riddhi</h1>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Manage saree catalog, categories, and storefront data.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-3 sm:pt-0.5">
              {/* Logged-in user pill */}
              {user && (
                <div className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/50 px-3 py-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {userInitials(user)}
                  </div>
                  <div className="min-w-0 leading-tight">
                    {user.displayName && (
                      <p className="truncate text-sm font-semibold text-foreground">
                        {user.displayName}
                      </p>
                    )}
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
              <ModeToggle className="h-9 min-h-9 w-9 min-w-9 rounded-md border-border shadow-sm dark:border-border" />
              <Button type="button" variant="secondary" size="sm" className="h-9 gap-2 rounded-md shadow-sm" onClick={() => setCategoriesOpen(true)}>
                <Tag className="size-3.5" aria-hidden />
                Categories
              </Button>
              <Link
                to="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "h-9 gap-2 rounded-md border-border shadow-sm no-underline"
                )}
              >
                <ExternalLink className="size-3.5 opacity-70" aria-hidden />
                View storefront
              </Link>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 gap-2 rounded-md text-muted-foreground hover:text-destructive"
                onClick={onSignOut}
              >
                <LogOut className="size-3.5" aria-hidden />
                Sign out
              </Button>
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 border-t border-border pt-4" aria-label="Admin sections">
            <NavLink to="/admin/products" className={navLinkClass}>
              <span className="inline-flex items-center gap-2">
                <LayoutGrid className="size-3.5 opacity-80" aria-hidden />
                Products
              </span>
            </NavLink>
            <NavLink to="/admin/orders" className={navLinkClass}>
              <span className="inline-flex items-center gap-2">
                <ShoppingBag className="size-3.5 opacity-80" aria-hidden />
                Orders
              </span>
            </NavLink>
            <NavLink to="/admin/users" className={navLinkClass}>
              <span className="inline-flex items-center gap-2">
                <Users className="size-3.5 opacity-80" aria-hidden />
                Users
              </span>
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </div>

      <CategoriesModal open={categoriesOpen} onOpenChange={setCategoriesOpen} />
    </section>
  );
}
