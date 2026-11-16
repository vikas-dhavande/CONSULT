"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { Blobatar } from "@blobatar/react";
import { account, teams } from "@/lib/appwrite";
import { clearCookieAction } from "@/app/actions";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { AuthModal } from "@/components/ui/AuthModal";
import { ProfileDropdown, MobileProfileMenu } from "@/components/ui/profile-dropdown";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Cloud,
  Code2,
  CreditCard,
  GraduationCap,
  Layers,
  RefreshCw,
  Settings,
  User,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { triggerWebsiteRefresh } from "@/components/ui/InitialWebLoader";

const navItems = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "services",
    label: "Services",
    groups: [
      {
        label: "Architecture & Engineering",
        links: [
          {
            label: "Cloud Architecture",
            href: "#cloud-architecture",
            description: "Scalable multi-cloud and edge deployment systems.",
            icon: Cloud,
          },
          {
            label: "Full-Stack Development",
            href: "#fullstack",
            description: "High-performance Next.js web applications.",
            icon: Code2,
          },
        ],
      },
      {
        label: "Integrations & Operations",
        links: [
          {
            label: "Appwrite Backend",
            href: "#appwrite-backend",
            description: "Auth, database schemas, and serverless functions.",
            icon: Zap,
          },
          {
            label: "DevOps & Cloudflare",
            href: "#devops",
            description: "CI/CD pipelines, edge caching, and security headers.",
            icon: Wrench,
          },
        ],
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "#pricing",
  },
  {
    id: "tools",
    label: "Tools",
    groups: [
      {
        label: "Utilities",
        links: [
          {
            label: "Developer Tools",
            href: "/tools",
            description: "Handy web utilities and automation scripts.",
            icon: Wrench,
          },
          {
            label: "API Diagnostics",
            href: "#diagnostics",
            description: "Real-time backend ping and latency probes.",
            icon: Layers,
          },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    groups: [
      {
        label: "Explore",
        links: [
          {
            label: "Documentation",
            href: "#resources",
            description: "Implementation guides, tutorials, and docs.",
            icon: BookOpen,
          },
          {
            label: "Certifications",
            href: "#certificates",
            description: "Professional credentials and verified badges.",
            icon: Award,
          },
        ],
      },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    href: "/blog",
  },
  {
    id: "about",
    label: "About",
    groups: [
      {
        label: "Company",
        links: [
          {
            label: "Our Story",
            href: "#about",
            description: "Mission, engineering principles, and journey.",
            icon: Building2,
          },
          {
            label: "Experience",
            href: "#experience",
            description: "Track record across enterprise consulting.",
            icon: BriefcaseBusiness,
          },
        ],
      },
    ],
  },
  {
    id: "join-with-us",
    label: "Join With Us",
    groups: [
      {
        label: "Collaborate",
        links: [
          {
            label: "Careers & Roles",
            href: "#careers",
            description: "Open developer, architect, and analyst positions.",
            icon: BriefcaseBusiness,
          },
          {
            label: "Partner Network",
            href: "#partners",
            description: "Strategic partnerships and affiliate collaborations.",
            icon: Users,
          },
        ],
      },
    ],
  },
];

export function Navbar({ initialUser = null, initialAvatarSeed = null }) {
  const [user, setUser] = useState(initialUser);
  const [isAdmin, setIsAdmin] = useState(false);

  // Avatar seed: cookie (SSR) > localStorage > null
  const [avatarSeed, setAvatarSeed] = useState(() => {
    if (initialAvatarSeed) return initialAvatarSeed;
    if (typeof window !== "undefined") {
      return localStorage.getItem("avatar_seed");
    }
    return null;
  });

  const [loading, setLoading] = useState(!initialUser);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openMobileSection, setOpenMobileSection] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const desktopNavRef = useRef(null);
  const menuTriggerRefs = useRef({});
  const mobileToggleRef = useRef(null);

  // Hover intent: small delay before closing so diagonal mouse moves don't kill the menu
  const closeTimer = useRef(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openNow = (id) => {
    cancelClose();
    setOpenMenu(id);
  };

  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const closeNow = () => {
    cancelClose();
    setOpenMenu(null);
  };

  useEffect(() => {
    return () => cancelClose();
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!desktopNavRef.current?.contains(event.target)) {
        closeNow();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        setOpenMobileSection(null);
        mobileToggleRef.current?.focus();
      }

      if (openMenu) {
        closeNow();
        menuTriggerRefs.current[openMenu]?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen, openMenu]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await triggerWebsiteRefresh("Refreshing Animations & Pipeline…");
    setTimeout(() => setRefreshing(false), 800);
  };

  useEffect(() => {
    if (initialUser) {
      setLoading(false);
      return;
    }

    // Only query Appwrite if there is an existing session token/cookie/local cache
    // to avoid logging 401 errors to the browser console for guest visitors
    const hasCachedUser =
      typeof window !== "undefined" && !!localStorage.getItem("auth_user");
    const hasAuthCookie =
      typeof document !== "undefined" && document.cookie.includes("auth_user");

    if (
      (hasCachedUser || hasAuthCookie) &&
      account &&
      typeof account.get === "function"
    ) {
      account
        .get()
        .then((u) => {
          setUser(u);
          // Sync avatar seed from localStorage if not already set via cookie
          const stored = localStorage.getItem("avatar_seed");
          if (stored && !avatarSeed) setAvatarSeed(stored);
        })
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    // Auto-sync session when tab receives focus (e.g. after popup or external auth)
    const syncSession = () => {
      account
        .get()
        .then((u) => {
          setUser(u);
          const stored = localStorage.getItem("avatar_seed");
          if (stored) setAvatarSeed(stored);
        })
        .catch(() => setUser(null));
    };

    const handleFocus = () => {
      const hasSession =
        (typeof window !== "undefined" && !!localStorage.getItem("auth_user")) ||
        (typeof document !== "undefined" &&
          document.cookie.includes("auth_user"));
      if (hasSession && account && typeof account.get === "function") {
        syncSession();
      }
    };

    const handleAuthChanged = () => syncSession();
    window.addEventListener("focus", handleFocus);
    window.addEventListener("appwrite-auth-changed", handleAuthChanged);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("appwrite-auth-changed", handleAuthChanged);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUser]);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const checkAdminStatus = async () => {
      // 1. Check user labels in Appwrite account (e.g. ['admin'])
      if (
        user.labels &&
        Array.isArray(user.labels) &&
        user.labels.some((l) => l.toLowerCase() === "admin")
      ) {
        setIsAdmin(true);
        return;
      }

      // 2. Check Appwrite Teams membership
      try {
        if (teams && typeof teams.list === "function") {
          const res = await teams.list();
          const configuredAdminTeamId =
            process.env.NEXT_PUBLIC_APPWRITE_ADMIN_TEAM_ID?.toLowerCase();

          const hasAdminTeam = res.teams?.some((t) => {
            const teamId = (t.$id || "").toLowerCase();
            const teamName = (t.name || "").toLowerCase();
            const roles = (t.roles || []).map((r) => r.toLowerCase());

            return (
              teamId === "admin" ||
              teamName === "admin" ||
              (configuredAdminTeamId && teamId === configuredAdminTeamId) ||
              roles.includes("admin") ||
              roles.includes("owner")
            );
          });

          setIsAdmin(!!hasAdminTeam);
          return;
        }
      } catch (err) {
        console.warn("Could not query user teams:", err);
      }

      setIsAdmin(false);
    };

    checkAdminStatus();
  }, [user]);

  const refreshUser = () => {
    if (account && typeof account.get === "function") {
      account
        .get()
        .then((u) => setUser(u))
        .catch(() => setUser(null));
    }
  };

  const handleAuthSuccess = (userName) => {
    setAvatarSeed(userName);
    refreshUser();
  };

  const handleLogout = () => {
    startTransition(async () => {
      try {
        if (account && typeof account.deleteSession === "function") {
          await account.deleteSession("current");
        }
      } catch { }

      try {
        localStorage.removeItem("auth_user");
        localStorage.removeItem("avatar_seed");
      } catch { }

      await clearCookieAction("auth_user");
      await clearCookieAction("avatar_seed");

      setUser(null);
      setAvatarSeed(null);
    });
  };

  const siteName =
    process.env.NEXT_PUBLIC_SITE_NAME ||
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME ||
    "Vikas";
  const siteLogoUrl = process.env.NEXT_PUBLIC_SITE_LOGO_URL || "";
  const siteLogoText =
    process.env.NEXT_PUBLIC_SITE_LOGO_TEXT ||
    (siteName ? siteName.charAt(0).toUpperCase() : "V");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl transition-colors duration-200">
      <div className="flex h-14 w-full items-center justify-between px-4 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex h-full items-center gap-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF6D1B] via-[#E11D48] to-[#6B5FFF] p-0.5 shadow-sm transition-transform duration-200 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-card overflow-hidden">
                {siteLogoUrl ? (
                  <img
                    src={siteLogoUrl}
                    alt={siteName}
                    className="h-full w-full object-contain p-1"
                  />
                ) : (
                  <span className="font-mono text-sm font-black text-foreground">
                    {siteLogoText}
                  </span>
                )}
              </div>
            </div>
            <span className="text-base font-bold tracking-tight text-foreground group-hover:text-foreground/90">
              {siteName}
            </span>
          </Link>

          {/* Desktop Mega Menu */}
          <nav
            ref={desktopNavRef}
            aria-label="Primary navigation"
            className="relative hidden h-14 items-center md:flex"
            onMouseEnter={cancelClose}
            onMouseLeave={closeSoon}
          >
            <ul className="flex h-full items-center gap-1 text-sm">
              {navItems.map((item) => {
                if (item.href && !item.groups) {
                  return (
                    <li
                      key={item.id}
                      className="relative flex h-full items-center"
                    >
                      <Link
                        href={item.href}
                        className="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:bg-secondary/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                const isOpen = openMenu === item.id;
                const menuId = `${item.id}-mega-menu`;

                return (
                  <li
                    key={item.id}
                    className="relative flex h-full items-center"
                    onMouseEnter={() => openNow(item.id)}
                  >
                    <button
                      id={`${item.id}-trigger`}
                      ref={(element) => {
                        menuTriggerRefs.current[item.id] = element;
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={menuId}
                      onClick={() => openNow(item.id)}
                      className={`flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isOpen
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                        }`}
                    >
                      {item.label}
                      <svg
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="m5 7.5 5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div
                      id={menuId}
                      aria-labelledby={`${item.id}-trigger`}
                      hidden={!isOpen}
                      className={`absolute left-0 top-full z-50 max-w-[calc(100vw-2rem)] ${item.groups.length > 1 ? "w-[34rem]" : "w-80"
                        }`}
                    >
                      <div
                        className={`grid gap-6 rounded-b-2xl rounded-t-none border border-t-0 border-border bg-card p-5 shadow-2xl ${item.groups.length > 1 ? "grid-cols-2" : "grid-cols-1"
                          }`}
                        onMouseEnter={cancelClose}
                      >
                        {item.groups.map((group) => (
                          <section key={group.label} aria-label={group.label}>
                            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              {group.label}
                            </h2>
                            <ul className="space-y-1">
                              {group.links.map((link) => {
                                const Icon = link.icon;
                                return (
                                  <li key={`${group.label}-${link.label}`}>
                                    <Link
                                      href={link.href}
                                      onClick={closeNow}
                                      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                      {Icon ? (
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors group-hover:text-foreground">
                                          <Icon
                                            aria-hidden="true"
                                            className="h-4 w-4"
                                          />
                                        </span>
                                      ) : null}
                                      <span className="min-w-0">
                                        <span className="block text-sm font-medium text-foreground">
                                          {link.label}
                                        </span>
                                        {link.description ? (
                                          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                                            {link.description}
                                          </span>
                                        ) : null}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </section>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggleButton />

          {/* Quick Animation & API Refresh Trigger */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            title="Refresh animation pipeline & API cache"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border bg-secondary/80 text-muted-foreground transition-all duration-150 hover:border-foreground/20 hover:bg-muted hover:text-foreground disabled:opacity-50"
            aria-label="Refresh animation rendering and API cache"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 transition-transform duration-300 ${refreshing
                  ? "animate-spin text-[#E11D48]"
                  : "group-hover:rotate-180"
                }`}
            />
          </button>

          {loading ? (
            <div className="hidden md:block h-8 w-20 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            /* Logged-In: Kokonut UI Profile Dropdown (desktop only, hidden on phone view) */
            <div className="hidden md:block">
              <ProfileDropdown
                accounts={[
                  {
                    id: user.$id || "current",
                    name: user.name || "User",
                    email: user.email || "",
                    plan: isAdmin ? "Admin" : "Member",
                  },
                ]}
                defaultAccountId={user.$id || "current"}
                items={[
                  {
                    label: "Dashboard",
                    href: "/dashboard",
                    icon: <User className="size-4" />,
                  },
                  {
                    label: "Profile & Account",
                    href: "/profile",
                    icon: <Settings className="size-4" />,
                  },
                  {
                    label: "Billing & Subscription",
                    href: "#billing",
                    icon: <CreditCard className="size-4" />,
                  },
                ]}
                onSignOut={handleLogout}
              />
            </div>
          ) : (
            /* Logged-Out: Auth Modal trigger */
            <div className="flex items-center gap-2 sm:gap-3">
              <AuthModal
                onAuthSuccess={handleAuthSuccess}
                trigger={
                  <button
                    type="button"
                    className="cursor-pointer rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90"
                  >
                    Login
                  </button>
                }
              />
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            ref={mobileToggleRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground md:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-navigation"
        hidden={!mobileMenuOpen}
        className="space-y-3 border-t border-border bg-background px-4 py-4 md:hidden"
      >
        <nav aria-label="Mobile primary navigation" className="text-sm">
          {navItems.map((item) => {
            if (item.href && !item.groups) {
              return (
                <div
                  key={item.id}
                  className="border-b border-border last:border-b-0 py-3"
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setOpenMobileSection(null);
                    }}
                    className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </div>
              );
            }

            const isOpen = openMobileSection === item.id;
            const sectionId = `mobile-${item.id}-links`;

            return (
              <section
                key={item.id}
                className="border-b border-border last:border-b-0"
              >
                <h2>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={sectionId}
                    onClick={() =>
                      setOpenMobileSection(isOpen ? null : item.id)
                    }
                    className="flex w-full cursor-pointer items-center justify-between py-3 text-left font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                    <svg
                      aria-hidden="true"
                      className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="m5 7.5 5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </h2>
                <div id={sectionId} hidden={!isOpen} className="pb-3 pl-2">
                  {item.groups.map((group) => (
                    <div key={group.label} className="pb-3 last:pb-0">
                      <h3 className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {group.label}
                      </h3>
                      {group.links.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={`${group.label}-${link.label}`}
                            href={link.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setOpenMobileSection(null);
                            }}
                            className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {Icon ? (
                              <Icon
                                aria-hidden="true"
                                className="h-4 w-4 shrink-0"
                              />
                            ) : null}
                            <span>
                              <span className="block text-sm font-medium text-foreground">
                                {link.label}
                              </span>
                              {link.description ? (
                                <span className="mt-0.5 block text-xs text-muted-foreground">
                                  {link.description}
                                </span>
                              ) : null}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </nav>
          {
            user?(
          <div className = "border-t border-border pt-3" >
            <MobileProfileMenu
              account={{
                id: user.$id || "current",
                name: user.name || "User",
                email: user.email || "",
                plan: isAdmin ? "Admin" : "Member",
              }}
              items={[
                {
                  label: "Dashboard",
                  href: "/dashboard",
                  icon: <User className="size-4" />,
                },
                {
                  label: "Profile & Account",
                  href: "/profile",
                  icon: <Settings className="size-4" />,
                },
                {
                  label: "Billing & Subscription",
                  href: "#billing",
                  icon: <CreditCard className="size-4" />,
                },
              ]}
              onSignOut={handleLogout}
              onItemClick={() => {
                setMobileMenuOpen(false);
                setOpenMobileSection(null);
              }}
            />
          </div>
        ) : (
          <div className="border-t border-border pt-3">
            <AuthModal
              onAuthSuccess={(name) => {
                handleAuthSuccess(name);
                setMobileMenuOpen(false);
              }}
              trigger={
                <button
                  type="button"
                  className="w-full cursor-pointer rounded-full bg-primary py-2.5 text-center text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90"
                >
                  Sign In / Register
                </button>
              }
            />
    </div>
  )
}
      </div >
    </header >
  );
}

export default Navbar;
