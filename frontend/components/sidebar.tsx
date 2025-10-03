"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  ShoppingCart,
  Bell,
  MenuIcon,
  Utensils,
  Users,
  CreditCard,
  Package,
  UserCheck,
  Settings,
  ChevronRight,
  Home,
  Calendar,
  Search,
  User,
  LogOut,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/lib/hooks/useAuth"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    notificationCount: 3,
  },
  {
    name: "Menu",
    href: "/menu",
    icon: Utensils,
    hasSubmenu: true,
  },
  {
    name: "Services",
    href: "/services",
    icon: UserCheck,
    hasSubmenu: true,
  },
  {
    name: "Table & Spaces",
    href: "/tables",
    icon: Calendar,
    hasSubmenu: true,
  },
  {
    name: "Finance",
    href: "/finance",
    icon: CreditCard,
    hasSubmenu: true,
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Package,
    hasSubmenu: true,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    name: "Staff",
    href: "/staff",
    icon: UserCheck,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user, tenant, restaurant, logout } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted && resolvedTheme === "dark"

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.name) return user.name
    if (user?.email) return user.email.split('@')[0]
    return 'User'
  }

  // Get user email
  const getUserEmail = () => {
    return user?.email || 'user@example.com'
  }

  // Get restaurant name
  const getRestaurantName = () => {
    if (restaurant?.name) return restaurant.name
    if (tenant?.name) return tenant.name
    return 'Restaurant'
  }

  console.log("[v0] Complete theme state:", {
    theme,
    resolvedTheme,
    mounted,
    isDarkMode,
    systemTheme: typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : null,
  })

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">RV</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">RestroVibe</h1>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Restaurant Info */}
      {/* {!collapsed && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getRestaurantName().charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {getRestaurantName()}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {tenant?.subscription_status || 'Premium Plan'}
              </p>
            </div>
          </div>
        </div>
      )} */}

      {!collapsed && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sidebar-foreground/60" />
            <Input
              placeholder="Search..."
              className="w-full pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/60"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors relative",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground",
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.notificationCount && (
                      <Badge className="h-5 w-5 rounded-full p-0 text-xs bg-primary text-primary-foreground">
                        {item.notificationCount}
                      </Badge>
                    )}
                    {item.hasSubmenu && <ChevronRight className="h-3 w-3 opacity-50" />}
                  </>
                )}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border space-y-3">
          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-sidebar-accent">
                <div className="flex items-center gap-3 p-3 w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials(getUserDisplayName())}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-xs text-sidebar-foreground/60 truncate">
                      {user?.role || 'User'}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem
                className="flex items-center justify-between cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="ml-2">Toggle theme</span>
                </div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={(checked) => {
                    console.log("[v0] Switch toggled:", {
                      checked,
                      currentTheme: theme,
                      resolvedTheme,
                      currentIsDarkMode: isDarkMode,
                      willSetTo: checked ? "dark" : "light",
                    })
                    setTheme(checked ? "dark" : "light")
                  }}
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                  <p className="text-xs leading-none text-muted-foreground">{getUserEmail()}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}
