import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────
 * BUTTON · ICON BUTTON
 *
 * The platform's complete action system. Gold is the primary accent
 * and emphasizes actions without dominating (brand spec); every
 * other variant stays quiet. Hover is a subtle lift, honored only
 * when motion is allowed. Renders a Next <Link> when `href` is
 * provided, a <button> otherwise.
 *
 * Variants
 *   primary        gold fill — the one emphasized action per view
 *   secondary      ink fill — strong action on light surfaces
 *   outline        hairline — supporting action on light surfaces
 *   outline-light  hairline — supporting action on dark surfaces
 *   ghost          bare text with nav treatment
 *   text           inline text link with underline affordance
 *   danger         destructive confirmation only (muted brand red)
 *
 * Accessibility: ≥44 px targets at every size (WCAG 2.2 target
 * size; Part 2 thumb-friendly requirement), visible focus via the
 * global gold ring, `disabled` communicated natively.
 * ─────────────────────────────────────────────────────────────────
 */

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "outline-light"
  | "ghost"
  | "text"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-nav font-semibold " +
  "tracking-nav uppercase transition-all duration-300 ease-premium " +
  "disabled:pointer-events-none disabled:opacity-45 " +
  "motion-safe:active:translate-y-0";

const lift = "motion-safe:hover:-translate-y-0.5";

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    "rounded-pill bg-gold-500 text-ink-950 shadow-sm hover:bg-gold-400 hover:shadow-md",
    lift,
  ),
  secondary: cn(
    "rounded-pill bg-ink-900 text-cream-100 shadow-sm hover:bg-charcoal-800",
    lift,
  ),
  outline: cn(
    "rounded-pill border border-charcoal-700 text-ink-900 hover:border-gold-600 hover:text-gold-700",
    lift,
  ),
  "outline-light": cn(
    "rounded-pill border border-cream-100/40 text-cream-100 hover:border-gold-300 hover:text-gold-300",
    lift,
  ),
  ghost: "rounded-pill text-ink-900 hover:bg-tan-200/60",
  text:
    "rounded-sm normal-case tracking-normal font-sans font-medium text-gold-700 " +
    "underline decoration-gold-500/40 underline-offset-4 hover:decoration-gold-600",
  danger: cn(
    "rounded-pill bg-error-600 text-cream-50 shadow-sm hover:bg-error-600/90",
    lift,
  ),
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-5 text-xs",
  md: "min-h-12 px-7 text-sm",
  lg: "min-h-14 px-9 text-sm",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsLink = CommonProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, "className"> & { href: string };

type ButtonAsButton = CommonProps &
  Omit<React.ComponentPropsWithoutRef<"button">, "className"> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    variant === "text" ? "min-h-0 px-0" : sizes[size],
    className,
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

/* ── Icon button ─────────────────────────────────────────────── */

type IconButtonProps = Omit<React.ComponentPropsWithoutRef<"button">, "children"> & {
  /** Required accessible name — icon buttons have no visible text. */
  label: string;
  variant?: Extract<ButtonVariant, "primary" | "outline" | "outline-light" | "ghost">;
  children: React.ReactNode;
};

export function IconButton({
  label,
  variant = "ghost",
  className,
  children,
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 ease-premium disabled:pointer-events-none disabled:opacity-45",
        variant === "primary" && "bg-gold-500 text-ink-950 hover:bg-gold-400",
        variant === "outline" &&
          "border border-charcoal-700 text-ink-900 hover:border-gold-600 hover:text-gold-700",
        variant === "outline-light" &&
          "border border-cream-100/40 text-cream-100 hover:border-gold-300 hover:text-gold-300",
        variant === "ghost" && "text-ink-900 hover:bg-tan-200/60",
        className,
      )}
      {...rest}
    >
      <span aria-hidden="true" className="[&>svg]:h-5 [&>svg]:w-5">
        {children}
      </span>
    </button>
  );
}
