import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/admin/AdminLayout";
import { AdminLoginPage } from "@/admin/pages/AdminLoginPage";
import { AdminProductFormPage } from "@/admin/pages/AdminProductFormPage";
import { AdminProductsListPage } from "@/admin/pages/AdminProductsListPage";
import { AdminOrdersPage } from "@/admin/pages/AdminOrdersPage";
import { AdminUsersPage } from "@/admin/pages/AdminUsersPage";
import { RequireAuth } from "@/admin/components/RequireAuth";
import { AuthProvider } from "@/features/auth/AuthContext";
import { toast } from "sonner";
import { loadPersistedCart, persistCart } from "@/lib/cart-storage";
import { submitContactMessage } from "@/lib/contact";
import { useProductsQuery } from "@/features/shop/use-shop-queries";
import { SiteHeader } from "@/sections/SiteHeader";
import { HeroSection } from "@/sections/HeroSection";
import { AccessoriesSection } from "@/sections/AccessoriesSection";
import { CatalogSection } from "@/sections/CatalogSection";
import { ShopSection } from "@/sections/ShopSection";
import { StorySection } from "@/sections/StorySection";
import { FeaturedSection } from "@/sections/FeaturedSection";
import { ReviewsSection } from "@/sections/ReviewsSection";
import { CartDrawer } from "@/sections/CartDrawer";
import { CheckoutPage } from "@/sections/CheckoutPage";
import { ProductDetailsPage } from "@/sections/ProductDetailsPage";
import { ReachUsSection } from "@/sections/ReachUsSection";
import { SiteFooter } from "@/sections/SiteFooter";
import { FAQPage } from "@/sections/FAQSection";
import { ShippingPage } from "@/sections/ShippingSection";

function HomeSections({ form, status, onChange, onSubmit }) {
  return (
    <>
      <HeroSection />
      <CatalogSection />
      <AccessoriesSection />
      <StorySection />
      <FeaturedSection />
      <ReviewsSection />
      <ReachUsSection form={form} status={status} onChange={onChange} onSubmit={onSubmit} />
      <SiteFooter />
    </>
  );
}

function ShopPage({ onAddToCart }) {
  return (
    <>
      <ShopSection onAddToCart={onAddToCart} />
      <SiteFooter />
    </>
  );
}

function ProductRoute({ onAddToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data: products = [], isLoading, isError, error, refetch } = useProductsQuery();
  const product = products.find((item) => item.id === productId);

  if (isLoading) {
    return (
      <>
        <section className="flex min-h-[50svh] items-center justify-center px-4 py-20">
          <p className="text-sm text-muted-foreground">Loading product…</p>
        </section>
        <SiteFooter />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <section className="flex min-h-[50svh] flex-col items-center justify-center gap-4 px-4 py-20">
          <p className="max-w-md text-center text-sm text-destructive">
            {error?.message || "Could not load the catalog."}
          </p>
          <button
            type="button"
            className="text-sm font-semibold text-primary underline underline-offset-4"
            onClick={() => refetch()}
          >
            Try again
          </button>
        </section>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <ProductDetailsPage
        product={product}
        products={products}
        onBack={() => navigate("/shop")}
        onAddToCart={onAddToCart}
      />
      <SiteFooter />
    </>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Hash links (e.g. /#story): React Router updates the URL but does not scroll like a full page load.
  useEffect(() => {
    if (location.pathname !== "/") return;
    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!id) return;

    const scrollToId = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    scrollToId();
    const raf = requestAnimationFrame(scrollToId);
    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.hash]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [cart, setCart] = useState(loadPersistedCart);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    persistCart(cart);
  }, [cart]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitContactMessage(form);
      setForm({ name: "", email: "", message: "" });
      setStatus("success");
      toast.success("Message sent", {
        description: "Thank you — we'll get back to you shortly.",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
      toast.error("Could not send message", {
        description: "Please try again in a moment or email us directly.",
      });
    }
  };

  const addToCart = (product, quantity = 1) => {
    const qty = Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    setCartOpen(true);
    toast.success("Added to cart", {
      description:
        qty > 1 ? `${product.name} · Quantity ${qty}` : product.name,
    });
  };

  const incrementQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    let removedName;
    setCart((prev) => {
      const before = prev.find((i) => i.id === productId);
      const next = prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        )
        .filter((item) => item.quantity > 0);
      if (before && !next.some((i) => i.id === productId)) {
        removedName = before.name;
      }
      return next;
    });
    if (removedName) {
      toast.info("Removed from cart", { description: removedName });
    }
  };

  const removeFromCart = (productId) => {
    let removedName;
    setCart((prev) => {
      const found = prev.find((item) => item.id === productId);
      removedName = found?.name;
      return prev.filter((item) => item.id !== productId);
    });
    if (removedName) {
      toast.info("Removed from cart", { description: removedName });
    }
  };

  const setQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const onCheckout = () => {
    if (!cart.length) return;
    setCartOpen(false);
    navigate("/checkout", { state: { items: cart, total: cartTotal } });
  };

  const onOrderConfirmed = () => {
    setCart([]);
    toast.success("Thanks for your order!", {
      description: "We'll confirm once we receive your payment screenshot.",
    });
  };

  return (
    <AuthProvider>
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {!isAdminRoute ? (
        <SiteHeader cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      ) : null}

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomeSections
                form={form}
                status={status}
                onChange={onChange}
                onSubmit={onSubmit}
              />
            }
          />
          <Route
            path="/shop"
            element={<ShopPage onAddToCart={addToCart} />}
          />
          <Route
            path="/shop/:productId"
            element={<ProductRoute onAddToCart={addToCart} />}
          />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="products" replace />} />
            <Route path="products" element={<AdminProductsListPage />} />
            <Route path="products/new" element={<AdminProductFormPage />} />
            <Route path="products/:productId" element={<AdminProductFormPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>
          <Route
            path="/checkout"
            element={
              <CheckoutPage onOrderConfirmed={onOrderConfirmed} />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminRoute ? (
        <CartDrawer
          isOpen={cartOpen}
          items={cart}
          total={cartTotal}
          isCheckingOut={false}
          checkoutStatus=""
          onClose={() => setCartOpen(false)}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
          onSetQuantity={setQuantity}
          onRemove={removeFromCart}
          onCheckout={onCheckout}
        />
      ) : null}
    </div>
    </AuthProvider>
  );
}
