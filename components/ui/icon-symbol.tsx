import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

// Mapping SF Symbols → Material Icons
const MAPPING: Record<string, string> = {
  // Navigation
  "house.fill": "home",
  house: "home",

  // Transactions
  signature: "edit",
  "signature.ja": "edit",
  receipt: "receipt",
  "receipt.fill": "receipt",
  "dollarsign.circle": "attach-money",
  "dollarsign.circle.fill": "attach-money",
  creditcard: "credit-card",
  "creditcard.fill": "credit-card",
  banknote: "money",
  "banknote.fill": "money",
  cart: "shopping-cart",
  "cart.fill": "shopping-cart",

  // Objectifs
  "star.fill": "star",
  star: "star-border",
  "heart.fill": "favorite",
  heart: "favorite-border",
  "flag.fill": "flag",
  flag: "flag",
  "trophy.fill": "emoji-events",
  trophy: "emoji-events",
  target: "track-changes",

  // Sagesse / Ampoule
  "lightbulb.fill": "lightbulb",
  lightbulb: "lightbulb-outline",
  "book.fill": "menu-book",
  book: "menu-book",

  // Paramètres
  "gearshape.fill": "settings",
  gearshape: "settings",
  gear: "settings",
  "person.fill": "person",
  person: "person-outline",

  // Actions
  "trash.fill": "delete",
  trash: "delete-outline",
  pencil: "edit",
  "pencil.fill": "edit",
  "plus.circle.fill": "add-circle",
  "plus.circle": "add-circle-outline",
  "checkmark.circle.fill": "check-circle",
  "checkmark.circle": "check-circle-outline",
  "xmark.circle.fill": "cancel",
  "xmark.circle": "cancel",
  "arrow.up": "arrow-upward",
  "arrow.down": "arrow-downward",
  "arrow.left": "arrow-back",
  "arrow.right": "arrow-forward",

  // Utilitaires
  calendar: "calendar-today",
  "calendar.fill": "calendar-today",
  clock: "access-time",
  "clock.fill": "access-time",
  magnifyingglass: "search",
  "magnifyingglass.circle": "search",
  "paperplane.fill": "send",
  paperplane: "send",
  "bell.fill": "notifications",
  bell: "notifications-none",
  "folder.fill": "folder",
  folder: "folder-open",

  // Crypto
  // brain: "network_intel_node_24",
  brain: "psychology",

  // Fallback
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "list.bullet": "list",
  ellipsis: "more-horiz",
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: string;
}) {
  const materialIconName = MAPPING[name];

  // Si l'icône n'est pas trouvée, utiliser une icône par défaut
  if (!materialIconName) {
    console.warn(`⚠️ Icon "${name}" not found in mapping, using default`);
    return (
      <MaterialIcons
        color={color}
        size={size}
        name="help-outline"
        style={style}

      />
    );
  }

  return (
    <MaterialIcons
      color={color}
      size={size}
      name={materialIconName as any}
      style={style}
    />
  );
}
