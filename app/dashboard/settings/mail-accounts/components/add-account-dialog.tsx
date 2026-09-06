/* eslint-disable max-lines-per-function */
"use client";

import { Button } from "@inbox/ui/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@inbox/ui/ui/dialog";
import { Input } from "@inbox/ui/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const providers = [
  {
    value: "gmail",
    label: "Gmail",
    imapHost: "imap.gmail.com",
    imapPort: 993,
    smtpHost: "smtp.gmail.com",
    smtpPort: 465,
  },
  {
    value: "outlook",
    label: "Outlook",
    imapHost: "outlook.office365.com",
    imapPort: 993,
    smtpHost: "smtp.office365.com",
    smtpPort: 587,
  },
  {
    value: "imap",
    label: "Custom IMAP",
    imapHost: "",
    imapPort: 993,
    smtpHost: "",
    smtpPort: 587,
  },
] as const;

const connectSchema = z.object({
  provider: z.string().min(1, "Provider is required"),
  email: z.email("Invalid email address"),
  displayName: z.string().optional(),
  imapHost: z.string().min(1, "IMAP host is required"),
  imapPort: z.number().int().positive().max(65535, "Invalid port"),
  smtpHost: z.string().min(1, "SMTP host is required"),
  smtpPort: z.number().int().positive().max(65535, "Invalid port"),
  oauthProvider: z.string().optional(),
  password: z.string().optional(),
});

type ConnectFormData = z.infer<typeof connectSchema>;

interface AddAccountDialogProps {
  onConnect: (data: {
    provider: string;
    email: string;
    displayName?: string;
    imapHost: string;
    imapPort: number;
    smtpHost: string;
    smtpPort: number;
    oauthProvider?: string;
    password?: string;
  }) => Promise<void>;
  isLoading: boolean;
}

export function AddAccountDialog({
  onConnect,
  isLoading,
}: AddAccountDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ConnectFormData>({
    provider: "gmail",
    email: "",
    displayName: "",
    imapHost: "",
    imapPort: 993,
    smtpHost: "",
    smtpPort: 587,
    oauthProvider: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ConnectFormData, string>>
  >({});

  const handleProviderChange = (provider: string) => {
    const providerConfig = providers.find(p => p.value === provider);
    setFormData({
      ...formData,
      provider,
      imapHost: providerConfig?.imapHost ?? "",
      imapPort: providerConfig?.imapPort ?? 993,
      smtpHost: providerConfig?.smtpHost ?? "",
      smtpPort: providerConfig?.smtpPort ?? 587,
    });
    setErrors(prev => ({ ...prev, provider: undefined }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = connectSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ConnectFormData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ConnectFormData;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    void (async () => {
      await onConnect(result.data);
      setIsOpen(false);
      setFormData({
        provider: "gmail",
        email: "",
        displayName: "",
        imapHost: "",
        imapPort: 993,
        smtpHost: "",
        smtpPort: 587,
        oauthProvider: "",
        password: "",
      });
    })();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button />}>
        <Plus className="size-4" data-icon="inline-start" />
        Add Account
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Mail Account</DialogTitle>
          <DialogDescription>
            Connect a new mailbox to your account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Provider</label>
            <select
              value={formData.provider}
              onChange={e => {
                handleProviderChange(e.target.value);
              }}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              {providers.map(provider => (
                <option key={provider.value} value={provider.value}>
                  {provider.label}
                </option>
              ))}
            </select>
            {errors.provider && (
              <p className="mt-1 text-xs text-destructive">{errors.provider}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={e => {
                setFormData({ ...formData, email: e.target.value });
              }}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Display Name</label>
            <Input
              type="text"
              value={formData.displayName}
              onChange={e => {
                setFormData({ ...formData, displayName: e.target.value });
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">IMAP Host</label>
              <Input
                type="text"
                value={formData.imapHost}
                onChange={e => {
                  setFormData({ ...formData, imapHost: e.target.value });
                }}
                aria-invalid={!!errors.imapHost}
              />
              {errors.imapHost && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.imapHost}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">IMAP Port</label>
              <Input
                type="number"
                value={formData.imapPort}
                onChange={e => {
                  setFormData({
                    ...formData,
                    imapPort: parseInt(e.target.value),
                  });
                }}
                aria-invalid={!!errors.imapPort}
              />
              {errors.imapPort && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.imapPort}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">SMTP Host</label>
              <Input
                type="text"
                value={formData.smtpHost}
                onChange={e => {
                  setFormData({ ...formData, smtpHost: e.target.value });
                }}
                aria-invalid={!!errors.smtpHost}
              />
              {errors.smtpHost && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.smtpHost}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">SMTP Port</label>
              <Input
                type="number"
                value={formData.smtpPort}
                onChange={e => {
                  setFormData({
                    ...formData,
                    smtpPort: parseInt(e.target.value),
                  });
                }}
                aria-invalid={!!errors.smtpPort}
              />
              {errors.smtpPort && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.smtpPort}
                </p>
              )}
            </div>
          </div>

          {formData.provider === "imap" && (
            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={formData.password}
                onChange={e => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                required
              />
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
