# PRD — Authentication & Organization

## Goal

Authenticate SDK employees securely and provide organization-aware authorization that can scale to future tenants.

## Requirements

- WorkOS AuthKit using current Next.js integration.
- Sign in/out and protected app routes.
- Server-safe access to session/user.
- Organization membership.
- Role/permission groundwork for admin/mailbox access.
- Account/profile surface sufficient for product use.
- Authorization enforced server-side.

## Failure states

Expired/invalid session, missing membership, insufficient permission, unavailable auth provider.

## Acceptance

Unauthorized users cannot access protected data/actions; role checks are tested; no secrets/session internals leak client-side.
