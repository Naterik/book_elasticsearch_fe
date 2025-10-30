import { useCurrentApp } from "@/app/providers/app.context";
import { useLocation } from "react-router-dom";
import { UserRole } from "@/types";

export function useRouteAccess() {
  const { isAuthenticated, user } = useCurrentApp();
  const location = useLocation();

  // Simple route permission check
  const isPublicRoute = [
    "/",
    "/about",
    "/book",
    "/login",
    "/register",
  ].includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith("/admin");
  const hasAccess =
    isPublicRoute ||
    (isAuthenticated && !isAdminRoute) ||
    (isAuthenticated && isAdminRoute && user?.role === UserRole.ADMIN);

  return {
    /**
     * Có quyền truy cập route hiện tại
     */
    hasAccess,
    reason: hasAccess ? undefined : "No permission",
    redirectTo: hasAccess ? undefined : isAuthenticated ? "/403" : "/login",

    isAdmin: user?.role === UserRole.ADMIN,

    /**
     * Là user thường không (không phải admin)
     */
    isUser: user?.role === UserRole.USER,

    /**
     * Có đăng nhập không
     */
    isAuthenticated: isAuthenticated || false,

    /**
     * Đang kiểm tra xác thực
     */
    isLoading: isAuthenticated === null || isAuthenticated === undefined,

    /**
     * Kiểm tra xem user có role cụ thể không
     */
    hasRole: (role: UserRole) => user?.role === role,

    /**
     * Kiểm tra xem user có bất kỳ role nào trong danh sách không
     */
    hasAnyRole: (roles: UserRole[]) => roles.includes(user?.role as UserRole),

    /**
     * Lấy user role hiện tại
     */
    userRole: user?.role as UserRole | undefined,

    /**
     * Lấy thông tin user
     */
    user,
  };
}

/**
 * Hook để kiểm tra quyền truy cập cho route cụ thể
 *
 * @param pathname - Đường dẫn route cần kiểm tra
 * @returns Các thông tin về quyền truy cập
 *
 * @example
 * const canAccessAdmin = useCanAccessRoute("/admin");
 * const canAccessLoan = useCanAccessRoute("/loan");
 */
export function useCanAccessRoute(pathname: string) {
  const { isAuthenticated, user } = useCurrentApp();

  const isPublicRoute = [
    "/",
    "/about",
    "/book",
    "/login",
    "/register",
  ].includes(pathname);
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    isPublicRoute ||
    (isAuthenticated && !isAdminRoute) ||
    (isAuthenticated && isAdminRoute && user?.role === UserRole.ADMIN)
  );
}

/**
 * Hook để kiểm tra xem user có role cụ thể không
 *
 * @param requiredRoles - Danh sách role được phép
 * @returns true nếu user có bất kỳ role nào trong danh sách
 *
 * @example
 * const isAdmin = useHasRole(["ADMIN"]);
 * const isAdminOrMod = useHasRole(["ADMIN", "MOD"]);
 */
export function useHasRole(requiredRoles: UserRole[]) {
  const { user } = useCurrentApp();
  return requiredRoles.includes(user?.role as UserRole);
}

/**
 * Hook để kiểm tra xem user có phải admin không
 *
 * @returns true nếu user là admin
 *
 * @example
 * const isAdmin = useIsAdmin();
 * if (isAdmin) {
 *   // Hiển thị admin controls
 * }
 */
export function useIsAdmin() {
  const { user } = useCurrentApp();
  return user?.role === UserRole.ADMIN;
}

/**
 * Hook để kiểm tra xem user có đăng nhập không
 *
 * @returns true nếu user đã đăng nhập
 *
 * @example
 * const isLoggedIn = useIsLoggedIn();
 */
export function useIsLoggedIn() {
  const { isAuthenticated } = useCurrentApp();
  return isAuthenticated === true;
}

/**
 * Hook để kiểm tra xem đang loading xác thực
 *
 * @returns true nếu đang kiểm tra xác thực
 *
 * @example
 * const isLoading = useAuthLoading();
 * if (isLoading) {
 *   return <Spinner />;
 * }
 */
export function useAuthLoading() {
  const { isAuthenticated } = useCurrentApp();
  return isAuthenticated === null || isAuthenticated === undefined;
}
