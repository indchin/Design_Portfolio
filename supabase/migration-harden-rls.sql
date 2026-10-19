-- Migration: harden publish_page (F-026, minimal part).
-- Run once in the Supabase SQL editor. Idempotent.
-- Effect: pins search_path on the SECURITY DEFINER function and restricts EXECUTE to service_role,
-- so anon/authenticated callers cannot invoke it via PostgREST /rpc.
-- RLS policy semantics are NOT changed here.

alter function publish_page(uuid) set search_path = public, pg_temp;

revoke all on function publish_page(uuid) from public;
revoke all on function publish_page(uuid) from anon, authenticated;
grant execute on function publish_page(uuid) to service_role;
