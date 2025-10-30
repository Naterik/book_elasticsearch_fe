/**
 * Admin Author Management Feature Module
 */

// Hooks
export { useAuthorManagement } from "./hooks/useAuthorManagement";

// Services
export * from "./services";

// Columns
export { getAuthorColumns } from "./author-columns";

// Pages
export { default as AuthorManagementPage } from "./pages/AuthorManagementPage";
