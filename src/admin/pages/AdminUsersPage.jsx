import { useEffect, useRef, useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  RefreshCw,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  createAdminUser,
  deleteAdminUserRecord,
  listAdminUsers,
  updateAdminUserName,
} from "@/api/users-api";

function formatDate(ts) {
  if (!ts) return "—";
  const date = ts?.toDate ? ts.toDate() : new Date(ts);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

const initialForm = { email: "", password: "", displayName: "" };

export function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const editInputRef = useRef(null);

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditingName(user.displayName ?? "");
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEdit = async (user) => {
    setSavingName(true);
    try {
      await updateAdminUserName(user.id, editingName);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, displayName: editingName.trim() || null }
            : u
        )
      );
      toast.success("Display name updated");
      setEditingId(null);
    } catch (err) {
      toast.error("Could not update name", { description: err.message });
    } finally {
      setSavingName(false);
    }
  };

  const fetchUsers = async (quiet = false) => {
    if (!quiet) setLoading(true);
    else setRefreshing(true);
    try {
      const data = await listAdminUsers();
      setUsers(data);
    } catch (err) {
      toast.error("Could not load users", { description: err.message });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const onFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const onAdd = async (e) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      const result = await createAdminUser({
        email: form.email.trim(),
        password: form.password,
        displayName: form.displayName.trim(),
      });
      if (result.alreadyExisted) {
        toast.success("User added to list", {
          description: `${form.email.trim()} already existed in Firebase Auth and has been added to the list.`,
        });
      } else {
        toast.success("User created", { description: form.email.trim() });
      }
      setForm(initialForm);
      setShowForm(false);
      await fetchUsers(true);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (user) => {
    if (!confirm(`Remove ${user.email} from the admin users list?`)) return;
    setDeletingId(user.id);
    try {
      await deleteAdminUserRecord(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      toast.success("User record removed", { description: user.email });
    } catch (err) {
      toast.error("Could not remove user", { description: err.message });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Admin users</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {loading ? "Loading…" : `${users.length} user${users.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 rounded-md"
            onClick={() => fetchUsers(true)}
            disabled={refreshing}
          >
            <RefreshCw className={cn("size-3.5", refreshing && "animate-spin")} aria-hidden />
            Refresh
          </Button>
          <Button
            type="button"
            size="sm"
            className="gap-2 rounded-md"
            onClick={() => { setShowForm((v) => !v); setFormError(""); setForm(initialForm); }}
          >
            <UserPlus className="size-3.5" aria-hidden />
            Add user
          </Button>
        </div>
      </div>

      {/* Add user form */}
      {showForm && (
        <form
          onSubmit={onAdd}
          className="rounded-2xl border border-border bg-card p-5 shadow-premium-sm"
        >
          <h3 className="text-sm font-semibold">New admin user</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="new-user-email">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                id="new-user-email"
                name="email"
                type="email"
                value={form.email}
                onChange={onFieldChange}
                placeholder="admin@example.com"
                className="mt-1.5"
                required
                disabled={saving}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="new-user-display">
                Display name <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <Input
                id="new-user-display"
                name="displayName"
                value={form.displayName}
                onChange={onFieldChange}
                placeholder="John Doe"
                className="mt-1.5"
                disabled={saving}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="new-user-password">
                Password <span className="text-destructive">*</span>
              </label>
              <div className="relative mt-1.5">
                <Input
                  id="new-user-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={onFieldChange}
                  placeholder="Min. 6 characters"
                  className="pr-10"
                  minLength={6}
                  required
                  disabled={saving}
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
            </div>
          </div>

          {formError && (
            <p className="mt-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {formError}
            </p>
          )}

          <div className="mt-4 flex gap-2">
            <Button type="submit" size="sm" className="rounded-md" disabled={saving}>
              {saving && <Loader2 className="mr-2 size-3.5 animate-spin" aria-hidden />}
              {saving ? "Creating…" : "Create user"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-md"
              onClick={() => { setShowForm(false); setFormError(""); setForm(initialForm); }}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl border border-border bg-muted/40" />
          ))}
        </div>
      )}

      {/* User list */}
      {!loading && users.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-14 text-center">
          <Users className="mx-auto size-7 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No users yet. Add one above.</p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-left">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Email
                </th>
                <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:table-cell">
                  Display name
                </th>
                <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:table-cell">
                  Created
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-medium">{user.email}</td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    {editingId === user.id ? (
                      <form
                        className="flex items-center gap-1.5"
                        onSubmit={(e) => { e.preventDefault(); saveEdit(user); }}
                      >
                        <Input
                          ref={editInputRef}
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          placeholder="Display name"
                          className="h-7 w-40 text-sm"
                          disabled={savingName}
                        />
                        <Button
                          type="submit"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 rounded-md p-0 text-green-500 hover:text-green-400"
                          disabled={savingName}
                          aria-label="Save"
                        >
                          {savingName
                            ? <Loader2 className="size-3.5 animate-spin" />
                            : <Check className="size-3.5" />}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 rounded-md p-0 text-muted-foreground hover:text-foreground"
                          disabled={savingName}
                          onClick={cancelEdit}
                          aria-label="Cancel"
                        >
                          <X className="size-3.5" />
                        </Button>
                      </form>
                    ) : (
                      <span className="text-muted-foreground">
                        {user.displayName || <span className="italic opacity-50">—</span>}
                      </span>
                    )}
                  </td>
                  <td className="hidden px-5 py-3.5 text-muted-foreground md:table-cell">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {editingId !== user.id && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 rounded-md p-0 text-muted-foreground hover:text-foreground"
                          onClick={() => startEdit(user)}
                          aria-label={`Edit display name for ${user.email}`}
                        >
                          <Pencil className="size-3.5" aria-hidden />
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 rounded-md p-0 text-muted-foreground hover:text-destructive"
                        disabled={deletingId === user.id || editingId === user.id}
                        onClick={() => onDelete(user)}
                        aria-label={`Remove ${user.email}`}
                      >
                        {deletingId === user.id
                          ? <Loader2 className="size-3.5 animate-spin" aria-hidden />
                          : <Trash2 className="size-3.5" aria-hidden />}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
