import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, KeyRound, Loader2, LogIn, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/AuthContext";
import { IMG } from "@/sections/data";

export function AdminLoginPage() {
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // "login" | "reset" | "reset_sent"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clearError = () => setError("");

  const onLogin = async (e) => {
    e.preventDefault();
    clearError();
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      navigate("/admin/products", { replace: true });
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const onReset = async (e) => {
    e.preventDefault();
    clearError();
    setLoading(true);
    try {
      await resetPassword(email.trim());
      setMode("reset_sent");
    } catch (err) {
      setError(friendlyError(err.code, "reset"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 dark:bg-background">
      <div className="w-full max-w-sm">
        {/* Logo + title */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <img
            src={IMG.logo}
            alt="House of Riddhi logo"
            className="h-32 w-auto object-contain sm:h-36"
          />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Administration
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {mode === "login" ? "Sign in" : "Reset password"}
            </h1>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
          {/* ── Reset sent confirmation ── */}
          {mode === "reset_sent" ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <MailCheck className="size-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Check your inbox</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  A password reset link has been sent to{" "}
                  <span className="font-medium text-foreground">{email}</span>.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 rounded-full"
                onClick={() => { setMode("login"); clearError(); }}
              >
                Back to sign in
              </Button>
            </div>
          ) : (
            <form onSubmit={mode === "login" ? onLogin : onReset} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="admin-email">
                  Email
                </label>
                <Input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError(); }}
                  placeholder="admin@example.com"
                  className="mt-1.5"
                  required
                  disabled={loading}
                />
              </div>

              {/* Password (login only) */}
              {mode === "login" && (
                <div>
                  <label className="text-sm font-medium text-foreground" htmlFor="admin-password">
                    Password
                  </label>
                  <div className="relative mt-1.5">
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); clearError(); }}
                      placeholder="••••••••"
                      className="pr-10"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword
                        ? <EyeOff className="size-4" aria-hidden />
                        : <Eye className="size-4" aria-hidden />}
                    </button>
                  </div>
                  <div className="mt-1.5 text-right">
                    <button
                      type="button"
                      className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                      onClick={() => { setMode("reset"); clearError(); }}
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              {/* Submit */}
              <Button type="submit" className="w-full rounded-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                ) : mode === "login" ? (
                  <LogIn className="mr-2 size-4" aria-hidden />
                ) : (
                  <KeyRound className="mr-2 size-4" aria-hidden />
                )}
                {loading
                  ? mode === "login" ? "Signing in…" : "Sending…"
                  : mode === "login" ? "Sign in" : "Send reset link"}
              </Button>

              {/* Back link for reset mode */}
              {mode === "reset" && (
                <button
                  type="button"
                  className="w-full text-center text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                  onClick={() => { setMode("login"); clearError(); }}
                >
                  Back to sign in
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function friendlyError(code, mode = "login") {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return mode === "reset"
        ? "No account found with that email address."
        : "Invalid email or password.";
    case "auth/invalid-email":
    case "auth/missing-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
