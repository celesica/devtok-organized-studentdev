/* @ds-bundle: {"format":4,"namespace":"WarmArcadeJazzyCelesicaDesignSystem_b48c44","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"GLYPH_NAMES","sourcePath":"components/core/Glyph.jsx"},{"name":"Glyph","sourcePath":"components/core/Glyph.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"List","sourcePath":"components/core/List.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"LevelBadge","sourcePath":"components/game/LevelBadge.jsx"},{"name":"QuestCard","sourcePath":"components/game/QuestCard.jsx"},{"name":"StatBlock","sourcePath":"components/game/StatBlock.jsx"},{"name":"XPBar","sourcePath":"components/game/XPBar.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"31983a97737b","components/core/Button.jsx":"1ccfee93b804","components/core/Card.jsx":"c4870e11313c","components/core/Glyph.jsx":"9d62ba38916c","components/core/IconButton.jsx":"421853f2423c","components/core/List.jsx":"c534e347ef69","components/core/Tag.jsx":"8ddec078cf53","components/feedback/Dialog.jsx":"5e743db8f9ad","components/feedback/Toast.jsx":"2384c57a71ae","components/feedback/Tooltip.jsx":"427a3542ed06","components/forms/Checkbox.jsx":"cf8ec71d632e","components/forms/Input.jsx":"0609a8568000","components/forms/Select.jsx":"75477430d298","components/forms/Switch.jsx":"3dd215a37883","components/game/LevelBadge.jsx":"349724393e2f","components/game/QuestCard.jsx":"a5150bd7efe5","components/game/StatBlock.jsx":"d91a934a9847","components/game/XPBar.jsx":"30c6c0d63c8d","components/navigation/NavBar.jsx":"12428b5331ff","components/navigation/Tabs.jsx":"dc5343675e48","ui_kits/planorama/App.jsx":"cc0446370904","ui_kits/planorama/AreasScreen.jsx":"9ddbcb9bd173","ui_kits/planorama/ReviewScreen.jsx":"2e5470a4a186","ui_kits/planorama/SeasonScreen.jsx":"17c8d5533412","ui_kits/planorama/Sidebar.jsx":"af9ca923b0a2","ui_kits/planorama/TodayScreen.jsx":"3fe0f1fc96c1","ui_kits/planorama/data.jsx":"1ca319e6735c","ui_kits/website/CounselPage.jsx":"b9c24a3b4f31","ui_kits/website/HomePage.jsx":"2fc60ffb37cf","ui_kits/website/PlanoramaPage.jsx":"31040ae1b5b9","ui_kits/website/Site.jsx":"9c4bca565329"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WarmArcadeJazzyCelesicaDesignSystem_b48c44 = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  tone = "rose",
  solid = false,
  children,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `wa-badge wa-badge--${solid ? "solid" : tone}${className ? " " + className : ""}`
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  as = "button",
  children,
  className = "",
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `wa-btn wa-btn--${variant} wa-btn--${size}${disabled ? " wa-btn--disabled" : ""}${className ? " " + className : ""}`,
    disabled: Tag === "button" ? disabled : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  variant = "default",
  lamp = false,
  interactive = false,
  children,
  className = "",
  ...rest
}) {
  const cls = ["wa-card", variant !== "default" ? `wa-card--${variant}` : "", lamp ? "wa-card--lamp" : "", interactive ? "wa-card--interactive" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Glyph.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Resolve the project root from the linked styles.css so glyph paths work from any depth. */
function projectRoot() {
  if (typeof document === "undefined") return "";
  const link = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find(l => (l.getAttribute("href") || "").includes("styles.css"));
  const href = link ? link.getAttribute("href") : "";
  return href.replace(/styles\.css.*$/, "");
}
const GLYPH_NAMES = ["warning", "trophy", "rank-up", "save", "spark", "heart", "hourglass", "controller"];
function Glyph({
  name = "spark",
  size = 28,
  glow = false,
  alt,
  className = "",
  style,
  ...rest
}) {
  const src = `${projectRoot()}assets/glyphs/glyph-${name}.png`;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: alt ?? `${name} glyph`,
    width: size,
    height: size,
    className: `wa-glyph${glow ? " wa-glyph--glow" : ""}${className ? " " + className : ""}`,
    style: {
      width: size,
      height: size,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { GLYPH_NAMES, Glyph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Glyph.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  size = "md",
  active = false,
  label,
  children,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    className: `wa-iconbtn wa-iconbtn--${size}${active ? " wa-iconbtn--active" : ""}${className ? " " + className : ""}`
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/List.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function List({
  type = "ul",
  items = [],
  children,
  className = "",
  ...rest
}) {
  const Tag = type === "ul" ? "ul" : "ol";
  const cls = `wa-list wa-list--${type === "ul" ? "ul" : "ol"}${type === "roman" ? " wa-list--roman" : ""}${className ? " " + className : ""}`;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), items.length ? items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, it)) : children);
}
Object.assign(__ds_scope, { List });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/List.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  selected = false,
  onClick,
  onRemove,
  children,
  className = "",
  ...rest
}) {
  const cls = ["wa-tag", selected ? "wa-tag--selected" : "", onClick ? "wa-tag--clickable" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    onClick: onClick
  }, rest), children, onRemove ? /*#__PURE__*/React.createElement("span", {
    className: "wa-tag__x",
    role: "button",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    }
  }, "\xD7") : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open = true,
  title,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  className = "",
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "wa-dialog__scrim",
    onClick: onCancel
  }, /*#__PURE__*/React.createElement("div", _extends({
    className: `wa-dialog${className ? " " + className : ""}`,
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, rest), title ? /*#__PURE__*/React.createElement("h3", {
    className: "wa-dialog__title"
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    className: "wa-dialog__body"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "wa-dialog__actions"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    onClick: onCancel
  }, cancelLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    onClick: onConfirm
  }, confirmLabel))));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toast({
  tone = "xp",
  glyph = "spark",
  children,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `wa-toast wa-toast--${tone}${className ? " " + className : ""}`,
    role: "status"
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Glyph, {
    name: glyph,
    size: 22,
    className: "wa-toast__glyph"
  }), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tooltip({
  text,
  open = false,
  children,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `wa-tip${open ? " wa-tip--open" : ""}${className ? " " + className : ""}`
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    className: "wa-tip__bubble",
    role: "tooltip"
  }, text));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  checked = false,
  disabled = false,
  onChange,
  label,
  className = "",
  ...rest
}) {
  const cls = ["wa-check", checked ? "wa-check--checked" : "", disabled ? "wa-check--disabled" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("label", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "wa-check__box",
    "aria-hidden": "true"
  }, "\u2713"), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  id,
  className = "",
  ...rest
}) {
  const inputId = id || (label ? `wa-in-${label.replace(/\W+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("label", {
    className: `wa-field${className ? " " + className : ""}`,
    htmlFor: inputId
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "wa-field__label"
  }, label) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: `wa-input${error ? " wa-input--error" : ""}`
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    className: "wa-field__hint wa-field__hint--error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "wa-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  options = [],
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `wa-field${className ? " " + className : ""}`
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "wa-field__label"
  }, label) : null, /*#__PURE__*/React.createElement("select", _extends({
    className: "wa-select"
  }, rest), options.map(o => {
    const value = typeof o === "string" ? o : o.value;
    const text = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, text);
  })), hint ? /*#__PURE__*/React.createElement("span", {
    className: "wa-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  on = false,
  disabled = false,
  onChange,
  label,
  className = "",
  ...rest
}) {
  const cls = ["wa-switch", on ? "wa-switch--on" : "", disabled ? "wa-switch--disabled" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("label", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "wa-switch__track",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wa-switch__thumb"
  })), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: on,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/game/LevelBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function LevelBadge({
  level = 1,
  title,
  size = "md",
  filled = false,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `wa-level${size === "lg" ? " wa-level--lg" : ""}${filled ? " wa-level--filled" : ""}${className ? " " + className : ""}`
  }, rest), /*#__PURE__*/React.createElement("span", null, "LV ", String(level).padStart(2, "0")), title ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-tech)",
      fontWeight: 500,
      letterSpacing: "var(--ls-tight)",
      opacity: 0.85
    }
  }, title) : null);
}
Object.assign(__ds_scope, { LevelBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/LevelBadge.jsx", error: String((e && e.message) || e) }); }

// components/game/QuestCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function QuestCard({
  title,
  glyph = "spark",
  area,
  xp,
  due,
  done = false,
  onToggle,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `wa-quest${done ? " wa-quest--done" : ""}${className ? " " + className : ""}`,
    onClick: onToggle
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Glyph, {
    name: done ? "trophy" : glyph,
    size: 34,
    className: "wa-quest__glyph",
    glow: !done
  }), /*#__PURE__*/React.createElement("div", {
    className: "wa-quest__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wa-quest__title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "wa-quest__meta"
  }, area ? /*#__PURE__*/React.createElement("span", null, area) : null, due ? /*#__PURE__*/React.createElement("span", null, "\xB7 ", due) : null)), /*#__PURE__*/React.createElement("div", {
    className: "wa-quest__side"
  }, xp != null ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: done ? "muted" : "amber"
  }, "+", xp, " XP") : null));
}
Object.assign(__ds_scope, { QuestCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/QuestCard.jsx", error: String((e && e.message) || e) }); }

// components/game/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatBlock({
  label,
  value,
  delta,
  tone = "default",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `wa-stat${className ? " " + className : ""}`
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "wa-stat__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: `wa-stat__value${tone !== "default" ? ` wa-stat__value--${tone}` : ""}`
  }, value), delta ? /*#__PURE__*/React.createElement("span", {
    className: "wa-stat__delta"
  }, delta) : null);
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/game/XPBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function XPBar({
  value = 0,
  max = 100,
  label = "XP",
  size = "md",
  showMeta = true,
  className = "",
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / (max || 1) * 100));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `wa-xp wa-xp--${size}${className ? " " + className : ""}`
  }, rest), showMeta ? /*#__PURE__*/React.createElement("div", {
    className: "wa-xp__meta"
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    className: "wa-xp__value"
  }, value.toLocaleString(), " / ", max.toLocaleString())) : null, /*#__PURE__*/React.createElement("div", {
    className: "wa-xp__track",
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": max
  }, /*#__PURE__*/React.createElement("div", {
    className: "wa-xp__fill",
    style: {
      width: `${pct}%`
    }
  })));
}
Object.assign(__ds_scope, { XPBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/XPBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NavBar({
  brand = "JAZZY CELESICA",
  accentWord,
  logo,
  links = [],
  active,
  onNavigate,
  right,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: `wa-nav${className ? " " + className : ""}`
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "wa-nav__brand",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10
    }
  }, logo ? /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "",
    style: {
      height: 30,
      width: "auto"
    }
  }) : null, brand, " ", accentWord ? /*#__PURE__*/React.createElement("em", null, accentWord) : null), /*#__PURE__*/React.createElement("div", {
    className: "wa-nav__links"
  }, links.map(l => {
    const id = typeof l === "string" ? l : l.value;
    const text = typeof l === "string" ? l : l.label;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      className: `wa-nav__link${active === id ? " wa-nav__link--active" : ""}`,
      onClick: () => onNavigate && onNavigate(id)
    }, text);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, right));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `wa-tabs${className ? " " + className : ""}`,
    role: "tablist"
  }, rest), items.map(it => {
    const id = typeof it === "string" ? it : it.value;
    const text = typeof it === "string" ? it : it.label;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      role: "tab",
      "aria-selected": value === id,
      className: `wa-tab${value === id ? " wa-tab--active" : ""}`,
      onClick: () => onChange && onChange(id)
    }, text);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/planorama/App.jsx
try { (() => {
// Kit file: wrapped in an IIFE so the design-system compiler does not export these
// screen components onto the public namespace. Shared names go on window explicitly.
(function () {
  const {
    Dialog,
    Toast,
    Input,
    Select,
    Button,
    Card
  } = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44;
  function App() {
    const [screen, setScreen] = React.useState("today");
    const [quests, setQuests] = React.useState(QUESTS);
    const [newOpen, setNewOpen] = React.useState(false);
    const [endOpen, setEndOpen] = React.useState(false);
    const [toasts, setToasts] = React.useState([]);
    const push = node => {
      const id = Math.random();
      setToasts(t => [...t, {
        id,
        node
      }]);
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3400);
    };
    const toggle = id => {
      setQuests(qs => qs.map(q => {
        if (q.id !== id) return q;
        if (!q.done) push(/*#__PURE__*/React.createElement("span", null, "Quest complete \xB7 ", /*#__PURE__*/React.createElement("strong", null, "+", q.xp, " XP")));
        return {
          ...q,
          done: !q.done
        };
      }));
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "pl-app"
    }, /*#__PURE__*/React.createElement(Sidebar, {
      screen: screen,
      onNavigate: setScreen,
      onNewQuest: () => setNewOpen(true)
    }), /*#__PURE__*/React.createElement("main", {
      className: "pl-main"
    }, screen === "today" && /*#__PURE__*/React.createElement(TodayScreen, {
      quests: quests,
      onToggle: toggle
    }), screen === "season" && /*#__PURE__*/React.createElement(SeasonScreen, null), screen === "areas" && /*#__PURE__*/React.createElement(AreasScreen, null), screen === "review" && /*#__PURE__*/React.createElement(ReviewScreen, {
      onEndSeason: () => setEndOpen(true)
    })), newOpen && /*#__PURE__*/React.createElement("div", {
      className: "wa-dialog__scrim",
      onClick: () => setNewOpen(false)
    }, /*#__PURE__*/React.createElement("div", {
      className: "wa-dialog",
      onClick: e => e.stopPropagation(),
      style: {
        maxWidth: 480
      }
    }, /*#__PURE__*/React.createElement("h3", {
      className: "wa-dialog__title"
    }, "New quest"), /*#__PURE__*/React.createElement(Input, {
      label: "Quest name",
      placeholder: "Ship the smallest version",
      defaultValue: "Call one person in the cohort"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Life area",
      options: ["Craft", "Body", "People", "Money"],
      defaultValue: "People"
    }), /*#__PURE__*/React.createElement(Select, {
      label: "XP",
      options: ["25", "40", "60", "90", "120"],
      defaultValue: "60"
    })), /*#__PURE__*/React.createElement("div", {
      className: "wa-dialog__actions"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => setNewOpen(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      onClick: () => {
        setQuests(qs => [{
          id: Date.now(),
          title: "Call one person in the cohort",
          glyph: "controller",
          area: "People",
          xp: 60,
          due: "Today · 20 min",
          done: false
        }, ...qs]);
        setNewOpen(false);
        setScreen("today");
        push(/*#__PURE__*/React.createElement("span", null, "Quest added to ", /*#__PURE__*/React.createElement("strong", null, "Today")));
      }
    }, "Add quest")))), /*#__PURE__*/React.createElement(Dialog, {
      open: endOpen,
      title: "End Season 04?",
      confirmLabel: "End season",
      onCancel: () => setEndOpen(false),
      onConfirm: () => {
        setEndOpen(false);
        push(/*#__PURE__*/React.createElement("span", null, "Season 04 closed \xB7 ", /*#__PURE__*/React.createElement("strong", null, "7,200 XP"), " kept"));
      }
    }, "Your XP is kept. Unfinished quests roll into Season 05 instead of disappearing."), /*#__PURE__*/React.createElement("div", {
      className: "pl-toastwrap"
    }, toasts.map(t => /*#__PURE__*/React.createElement(Toast, {
      key: t.id,
      tone: "xp",
      glyph: "trophy"
    }, t.node))));
  }
  Object.assign(window, {
    App
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/planorama/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/planorama/AreasScreen.jsx
try { (() => {
// Kit file: wrapped in an IIFE so the design-system compiler does not export these
// screen components onto the public namespace. Shared names go on window explicitly.
(function () {
  const {
    Card,
    XPBar,
    Badge,
    Tabs,
    Glyph,
    Button
  } = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44;
  function AreasScreen() {
    const [tab, setTab] = React.useState("All");
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "pl-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "pl-kicker"
    }, "Four areas \xB7 one life"), /*#__PURE__*/React.createElement("h1", {
      className: "pl-title"
    }, "Areas"), /*#__PURE__*/React.createElement("p", {
      className: "pl-sub"
    }, "Areas never finish. They level. A neglected area shows up here before it shows up in your body.")), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, "Add an area")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      items: ["All", "Craft", "Body", "People", "Money"],
      value: tab,
      onChange: setTab
    })), /*#__PURE__*/React.createElement("div", {
      className: "pl-grid pl-grid--2",
      style: {
        gridTemplateColumns: "1fr 1fr"
      }
    }, AREAS.map(a => /*#__PURE__*/React.createElement(Card, {
      key: a.name,
      interactive: true,
      lamp: a.name === "Craft"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement(Glyph, {
      name: a.name === "Body" ? "heart" : a.name === "People" ? "controller" : a.name === "Money" ? "warning" : "rank-up",
      size: 28,
      glow: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "pl-areaname"
    }, a.name), /*#__PURE__*/React.createElement("div", {
      className: "pl-areasub"
    }, a.sub)), /*#__PURE__*/React.createElement(Badge, {
      tone: a.pct < 40 ? "ember" : "muted"
    }, "LV ", a.level)), /*#__PURE__*/React.createElement(XPBar, {
      label: "Area XP",
      value: a.pct,
      max: 100,
      size: "md"
    })))), /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("h3", {
      className: "pl-secttitle"
    }, "Attention"), /*#__PURE__*/React.createElement("div", {
      className: "pl-arealist"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pl-arearow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pl-areaname"
    }, "Money"), /*#__PURE__*/React.createElement("span", {
      className: "pl-empty"
    }, "Two invoices are past due and the area hasn't levelled in eleven days."), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, "Open")))));
  }
  Object.assign(window, {
    AreasScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/planorama/AreasScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/planorama/ReviewScreen.jsx
try { (() => {
// Kit file: wrapped in an IIFE so the design-system compiler does not export these
// screen components onto the public namespace. Shared names go on window explicitly.
(function () {
  const {
    Card,
    StatBlock,
    Badge,
    Button,
    Glyph,
    Tooltip
  } = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44;
  function ReviewScreen({
    onEndSeason
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "pl-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "pl-kicker"
    }, "Week 04 \xB7 review"), /*#__PURE__*/React.createElement("h1", {
      className: "pl-title"
    }, "What actually happened"), /*#__PURE__*/React.createElement("p", {
      className: "pl-sub"
    }, "Review is not a scoreboard. It is the part where you find out what your week was really about.")), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      onClick: onEndSeason
    }, "End the season")), /*#__PURE__*/React.createElement("div", {
      className: "pl-grid pl-grid--3",
      style: {
        marginBottom: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(StatBlock, {
      label: "Quests cleared",
      value: "19",
      delta: "+4 vs last week",
      tone: "rose"
    })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(StatBlock, {
      label: "XP earned",
      value: "1,340",
      delta: "best week of the season",
      tone: "amber"
    })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(StatBlock, {
      label: "Rest days taken",
      value: "2"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "pl-grid pl-grid--2"
    }, /*#__PURE__*/React.createElement(Card, {
      lamp: true
    }, /*#__PURE__*/React.createElement("h3", {
      className: "pl-secttitle"
    }, "The one honest sentence"), /*#__PURE__*/React.createElement("p", {
      className: "pl-quote"
    }, "I kept the Craft area lit all week and let People go quiet \u2014 and I felt the difference on Sunday."), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 18,
        marginBottom: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pl-script"
    }, "Purpose"))), /*#__PURE__*/React.createElement("div", {
      className: "pl-stack",
      style: {
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
      className: "pl-secttitle"
    }, "Earned"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 18,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Tooltip, {
      text: "4 weeks of deep work blocks"
    }, /*#__PURE__*/React.createElement(Glyph, {
      name: "trophy",
      size: 40,
      glow: true
    })), /*#__PURE__*/React.createElement(Tooltip, {
      text: "Levelled Craft to 12"
    }, /*#__PURE__*/React.createElement(Glyph, {
      name: "rank-up",
      size: 40,
      glow: true
    })), /*#__PURE__*/React.createElement(Tooltip, {
      text: "Vault backed up on schedule"
    }, /*#__PURE__*/React.createElement(Glyph, {
      name: "save",
      size: 40,
      glow: true
    })), /*#__PURE__*/React.createElement(Badge, {
      solid: true
    }, "+3 badges"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
      className: "pl-secttitle"
    }, "Next week's smallest promise"), /*#__PURE__*/React.createElement("p", {
      className: "pl-empty",
      style: {
        margin: "0 0 14px"
      }
    }, "One 20-minute call with someone in the cohort. That's it."), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm"
    }, "Lock it in")))));
  }
  Object.assign(window, {
    ReviewScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/planorama/ReviewScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/planorama/SeasonScreen.jsx
try { (() => {
// Kit file: wrapped in an IIFE so the design-system compiler does not export these
// screen components onto the public namespace. Shared names go on window explicitly.
(function () {
  const {
    Card,
    XPBar,
    LevelBadge,
    Badge,
    StatBlock,
    Tag,
    Button,
    Glyph
  } = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44;
  function SeasonScreen() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "pl-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "pl-kicker"
    }, "Season 04 \xB7 90 days"), /*#__PURE__*/React.createElement("h1", {
      className: "pl-title"
    }, "Rebuild"), /*#__PURE__*/React.createElement("p", {
      className: "pl-sub"
    }, "One theme per season. Everything you plan has to point at it, or it waits for Season 05.")), /*#__PURE__*/React.createElement(LevelBadge, {
      level: 36,
      title: "Architect",
      size: "lg"
    })), /*#__PURE__*/React.createElement(Card, {
      lamp: true,
      style: {
        marginBottom: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement(XPBar, {
      label: "Season XP",
      value: 7200,
      max: 10000,
      size: "lg"
    }), /*#__PURE__*/React.createElement("div", {
      className: "pl-grid pl-grid--3",
      style: {
        marginTop: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement(StatBlock, {
      label: "Days elapsed",
      value: "26",
      delta: "64 to go"
    }), /*#__PURE__*/React.createElement(StatBlock, {
      label: "Quests cleared",
      value: "148",
      tone: "rose"
    }), /*#__PURE__*/React.createElement(StatBlock, {
      label: "Deep hours",
      value: "36.5",
      tone: "amber"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "pl-grid pl-grid--2"
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
      className: "pl-secttitle"
    }, "Season pledges"), /*#__PURE__*/React.createElement("div", {
      className: "pl-stack",
      style: {
        gap: 14
      }
    }, [["Ship the analog-front-end build", "trophy", 80], ["Teach 12 live lessons", "controller", 55], ["Sleep before midnight, 5 nights a week", "heart", 38]].map(([t, g, pct]) => /*#__PURE__*/React.createElement("div", {
      key: t,
      style: {
        display: "flex",
        gap: 14,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Glyph, {
      name: g,
      size: 26,
      glow: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pl-areaname"
    }, t), /*#__PURE__*/React.createElement("span", {
      className: "pl-areasub"
    }, pct, "%")), /*#__PURE__*/React.createElement(XPBar, {
      value: pct,
      max: 100,
      size: "sm",
      showMeta: false
    })))))), /*#__PURE__*/React.createElement("div", {
      className: "pl-stack",
      style: {
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
      className: "pl-secttitle"
    }, "Unlocked this season"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      solid: true
    }, "LV 36"), /*#__PURE__*/React.createElement(Badge, {
      tone: "amber"
    }, "Streak 12"), /*#__PURE__*/React.createElement(Badge, {
      tone: "rose"
    }, "Night owl retired"), /*#__PURE__*/React.createElement(Badge, {
      tone: "lilac"
    }, "Vault backup"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
      className: "pl-secttitle"
    }, "Carried from Season 03"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      onRemove: () => {}
    }, "Rewrite the intro course"), /*#__PURE__*/React.createElement(Tag, {
      onRemove: () => {}
    }, "Fix the bench PSU")), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, "Roll into Season 05")))));
  }
  Object.assign(window, {
    SeasonScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/planorama/SeasonScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/planorama/Sidebar.jsx
try { (() => {
// Kit file: wrapped in an IIFE so the design-system compiler does not export these
// screen components onto the public namespace. Shared names go on window explicitly.
(function () {
  const {
    Glyph,
    XPBar,
    LevelBadge,
    Button
  } = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44;
  const NAV = [{
    id: "today",
    label: "Today",
    glyph: "spark"
  }, {
    id: "season",
    label: "Season",
    glyph: "hourglass"
  }, {
    id: "areas",
    label: "Areas",
    glyph: "controller"
  }, {
    id: "review",
    label: "Review",
    glyph: "trophy"
  }];
  function Sidebar({
    screen,
    onNavigate,
    onNewQuest
  }) {
    return /*#__PURE__*/React.createElement("aside", {
      className: "pl-side"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pl-brand"
    }, "PLAN", /*#__PURE__*/React.createElement("em", null, "ORAMA")), /*#__PURE__*/React.createElement("div", {
      className: "pl-navlist"
    }, NAV.map(n => /*#__PURE__*/React.createElement("button", {
      key: n.id,
      className: `pl-navitem${screen === n.id ? " pl-navitem--active" : ""}`,
      onClick: () => onNavigate(n.id)
    }, /*#__PURE__*/React.createElement(Glyph, {
      name: n.glyph,
      size: 18
    }), n.label))), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      onClick: onNewQuest
    }, "New quest"), /*#__PURE__*/React.createElement("div", {
      className: "pl-side__foot"
    }, /*#__PURE__*/React.createElement(LevelBadge, {
      level: 36,
      title: "Architect"
    }), /*#__PURE__*/React.createElement(XPBar, {
      label: "Season XP",
      value: 7200,
      max: 10000,
      size: "sm"
    }), /*#__PURE__*/React.createElement("span", {
      className: "pl-areasub"
    }, "Season 04 \xB7 day 26 of 90")));
  }
  Object.assign(window, {
    Sidebar,
    NAV
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/planorama/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/planorama/TodayScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Kit file: wrapped in an IIFE so the design-system compiler does not export these
// screen components onto the public namespace. Shared names go on window explicitly.
(function () {
  const {
    Card,
    QuestCard,
    StatBlock,
    Badge,
    Button,
    XPBar
  } = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44;
  function TodayScreen({
    quests,
    onToggle
  }) {
    const open = quests.filter(q => !q.done);
    const doneCount = quests.length - open.length;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "pl-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "pl-kicker"
    }, "Thursday \xB7 14 August"), /*#__PURE__*/React.createElement("h1", {
      className: "pl-title"
    }, "Today"), /*#__PURE__*/React.createElement("p", {
      className: "pl-sub"
    }, "Four quests, one of them small enough that you can start it before you feel ready.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(StatBlock, {
      label: "Streak",
      value: "12",
      delta: "+3 this week",
      tone: "amber"
    }), /*#__PURE__*/React.createElement(StatBlock, {
      label: "XP today",
      value: "160",
      tone: "rose"
    }), /*#__PURE__*/React.createElement(StatBlock, {
      label: "Done",
      value: `${doneCount}/${quests.length}`
    }))), /*#__PURE__*/React.createElement("div", {
      className: "pl-hero",
      style: {
        marginBottom: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/imagery/hero-planorama-169.png",
      alt: "Lamp-lit desk with an open journal and mug"
    }), /*#__PURE__*/React.createElement("div", {
      className: "pl-hero__scrim"
    }), /*#__PURE__*/React.createElement("div", {
      className: "pl-hero__body"
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "amber"
    }, "Focus block"), /*#__PURE__*/React.createElement("h2", {
      className: "pl-hero__h"
    }, "Two hours at the desk beats a perfect plan you never opened."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm"
    }, "Start 50-min block"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "Reschedule")))), /*#__PURE__*/React.createElement("div", {
      className: "pl-grid pl-grid--2"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "pl-secttitle"
    }, "Quest log"), /*#__PURE__*/React.createElement("div", {
      className: "pl-stack"
    }, quests.map(q => /*#__PURE__*/React.createElement(QuestCard, _extends({
      key: q.id
    }, q, {
      onToggle: () => onToggle(q.id)
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "pl-stack",
      style: {
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement(Card, {
      lamp: true
    }, /*#__PURE__*/React.createElement("h3", {
      className: "pl-secttitle"
    }, "Area progress"), /*#__PURE__*/React.createElement("div", {
      className: "pl-stack",
      style: {
        gap: 14
      }
    }, AREAS.slice(0, 3).map(a => /*#__PURE__*/React.createElement("div", {
      key: a.name
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pl-areaname"
    }, a.name), /*#__PURE__*/React.createElement("span", {
      className: "pl-areasub"
    }, "LV ", a.level)), /*#__PURE__*/React.createElement(XPBar, {
      value: a.pct,
      max: 100,
      size: "sm",
      showMeta: false
    }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
      className: "pl-secttitle"
    }, "This week"), /*#__PURE__*/React.createElement("div", {
      className: "pl-week"
    }, WEEK.map((w, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `pl-day${w.state === "hit" ? " pl-day--hit" : w.state === "rest" ? " pl-day--rest" : ""}`
    }, w.d))), /*#__PURE__*/React.createElement("p", {
      className: "pl-empty",
      style: {
        marginTop: 14,
        marginBottom: 0
      }
    }, "Friday was a rest day. Rest days count \u2014 they are on the board.")))));
  }
  Object.assign(window, {
    TodayScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/planorama/TodayScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/planorama/data.jsx
try { (() => {
// Kit file: wrapped in an IIFE so the design-system compiler does not export these
// screen components onto the public namespace. Shared names go on window explicitly.
(function () {
  const DS = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44;
  const AREAS = [{
    name: "Craft",
    sub: "EE degree · builds",
    level: 12,
    pct: 72
  }, {
    name: "Body",
    sub: "walks · sleep",
    level: 8,
    pct: 44
  }, {
    name: "People",
    sub: "teaching · family",
    level: 10,
    pct: 58
  }, {
    name: "Money",
    sub: "runway · invoices",
    level: 6,
    pct: 31
  }];
  const QUESTS = [{
    id: 1,
    title: "Finish the ADC lab report",
    glyph: "rank-up",
    area: "Craft",
    xp: 120,
    due: "Today · 45 min",
    done: false
  }, {
    id: 2,
    title: "Walk before the sun sets",
    glyph: "heart",
    area: "Body",
    xp: 40,
    due: "Today · 20 min",
    done: true
  }, {
    id: 3,
    title: "Record lesson 4 for the cohort",
    glyph: "controller",
    area: "People",
    xp: 90,
    due: "Today · 30 min",
    done: false
  }, {
    id: 4,
    title: "Send the two overdue invoices",
    glyph: "warning",
    area: "Money",
    xp: 60,
    due: "Overdue · 15 min",
    done: false
  }, {
    id: 5,
    title: "Back up the PLANORAMA vault",
    glyph: "save",
    area: "Craft",
    xp: 25,
    due: "Weekly",
    done: false
  }];
  const WEEK = [{
    d: "M",
    state: "hit"
  }, {
    d: "T",
    state: "hit"
  }, {
    d: "W",
    state: "hit"
  }, {
    d: "T",
    state: "hit"
  }, {
    d: "F",
    state: "rest"
  }, {
    d: "S",
    state: "hit"
  }, {
    d: "S",
    state: "todo"
  }];
  Object.assign(window, {
    DS,
    AREAS,
    QUESTS,
    WEEK
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/planorama/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CounselPage.jsx
try { (() => {
// Kit file: wrapped in an IIFE so the design-system compiler does not export these
// screen components onto the public namespace. Shared names go on window explicitly.
(function () {
  const {
    Button,
    Card,
    Badge,
    Glyph,
    Input,
    Select,
    Tag
  } = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44;
  function CounselPage() {
    const [sent, setSent] = React.useState(false);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
      className: "st-hero",
      style: {
        minHeight: 400
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/imagery/hero-counsel-169.png",
      alt: "Quiet lamp-lit corner"
    }), /*#__PURE__*/React.createElement("div", {
      className: "st-hero__scrim"
    }), /*#__PURE__*/React.createElement("div", {
      className: "st-wrap st-hero__body"
    }, /*#__PURE__*/React.createElement("span", {
      className: "st-kicker"
    }, "Counsel \xB7 1:1"), /*#__PURE__*/React.createElement("h1", {
      className: "st-h1",
      style: {
        fontSize: 54
      }
    }, "An hour with someone who has already been lost in your particular way"), /*#__PURE__*/React.createElement("p", {
      className: "st-lede"
    }, "For immigrants rebuilding a career, introverts who hate the loud version of ambition, and late bloomers who think the door has closed."))), /*#__PURE__*/React.createElement("section", {
      className: "st-sect"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-wrap st-grid2",
      style: {
        gridTemplateColumns: "1fr 1fr"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "st-kicker"
    }, "What we do in the hour"), /*#__PURE__*/React.createElement("h2", {
      className: "st-h2"
    }, "One plan, sized to the week you actually have"), /*#__PURE__*/React.createElement("ul", {
      className: "st-list",
      style: {
        marginTop: 22
      }
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Glyph, {
      name: "hourglass",
      size: 20,
      glow: true
    }), "We find the twenty minutes that already exist in your day."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Glyph, {
      name: "rank-up",
      size: 20,
      glow: true
    }), "We cut the plan until the worst version of you can finish it."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Glyph, {
      name: "save",
      size: 20,
      glow: true
    }), "You leave with a written season, not a feeling.")), /*#__PURE__*/React.createElement("div", {
      className: "st-rule"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Tag, null, "Career rebuilds"), /*#__PURE__*/React.createElement(Tag, null, "Study plans"), /*#__PURE__*/React.createElement(Tag, null, "Visa-year triage"), /*#__PURE__*/React.createElement(Tag, null, "Burnout recovery"))), /*#__PURE__*/React.createElement(Card, {
      lamp: true
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "amber"
    }, "3 slots this month"), /*#__PURE__*/React.createElement("h3", {
      className: "st-card__h",
      style: {
        marginTop: 14,
        fontSize: 22
      }
    }, "Ask for an hour"), sent ? /*#__PURE__*/React.createElement("p", {
      className: "st-card__p",
      style: {
        marginTop: 14
      }
    }, "Got it. You'll hear back within two days \u2014 and the reply will be a real one, not a funnel.") : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14,
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Your name",
      placeholder: "Who am I talking to?"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Email",
      type: "email",
      placeholder: "you@somewhere.com"
    }), /*#__PURE__*/React.createElement(Select, {
      label: "What's the season about?",
      options: ["A career rebuild", "Finishing a degree", "Getting my time back", "Something else"]
    }), /*#__PURE__*/React.createElement(Input, {
      label: "One sentence of context",
      placeholder: "The honest version, not the polished one."
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "md",
      onClick: () => setSent(true)
    }, "Send it"))))), /*#__PURE__*/React.createElement("section", {
      className: "st-sect st-sect--plum"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-wrap st-grid2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-figblock"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/imagery/life-writing-169.png",
      alt: "Writing by lamplight",
      style: {
        aspectRatio: "16/10"
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "st-quote"
    }, "She didn't give me motivation. She gave me a Tuesday I could survive."), /*#__PURE__*/React.createElement("p", {
      className: "st-body",
      style: {
        marginTop: 18
      }
    }, "\u2014 cohort member, Season 02")))));
  }
  Object.assign(window, {
    CounselPage
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CounselPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomePage.jsx
try { (() => {
// Kit file: wrapped in an IIFE so the design-system compiler does not export these
// screen components onto the public namespace. Shared names go on window explicitly.
(function () {
  const {
    Button,
    Card,
    Badge,
    Glyph,
    StatBlock,
    XPBar
  } = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44;
  function HomePage({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
      className: "st-hero"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/imagery/banner-hero-169.png",
      alt: "Lamp-lit desk with a neon rose sign"
    }), /*#__PURE__*/React.createElement("div", {
      className: "st-hero__scrim"
    }), /*#__PURE__*/React.createElement("div", {
      className: "st-wrap st-hero__body"
    }, /*#__PURE__*/React.createElement("span", {
      className: "st-kicker"
    }, "Computer scientist \xB7 electrical engineer in the making"), /*#__PURE__*/React.createElement("h1", {
      className: "st-h1"
    }, "I turn life into a game you'd actually choose to play \u2014 and you plan with ", /*#__PURE__*/React.createElement("span", {
      className: "sc"
    }, "Purpose")), /*#__PURE__*/React.createElement("p", {
      className: "st-lede"
    }, "PLANORAMA is a life OS that runs on quests, XP and seasons instead of guilt. I teach immigrants, introverts and late bloomers to begin before they feel ready."), /*#__PURE__*/React.createElement("div", {
      className: "st-cta"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      onClick: () => onNavigate("PLANORAMA")
    }, "See PLANORAMA"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "lg",
      onClick: () => onNavigate("Counsel")
    }, "Work with me")))), /*#__PURE__*/React.createElement("section", {
      className: "st-sect"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-sect__head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "st-kicker"
    }, "01 \u2014 What I build"), /*#__PURE__*/React.createElement("h2", {
      className: "st-h2"
    }, "Three rooms in one house")), /*#__PURE__*/React.createElement("p", {
      className: "st-body"
    }, "The study room and the arcade cabinet are the same room. One gives you the warmth to sit down; the other gives you a reason to come back tomorrow.")), /*#__PURE__*/React.createElement("div", {
      className: "st-grid3"
    }, /*#__PURE__*/React.createElement(Card, {
      interactive: true,
      lamp: true,
      onClick: () => onNavigate("PLANORAMA")
    }, /*#__PURE__*/React.createElement("img", {
      className: "st-thumb",
      src: "../../assets/imagery/hero-planorama-169.png",
      alt: "Journal and mug under a desk lamp"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "st-card__h"
    }, "PLANORAMA"), /*#__PURE__*/React.createElement("p", {
      className: "st-card__p"
    }, "A life OS with quests, XP and 90-day seasons. Built for people whose plans keep collapsing under their own weight.")), /*#__PURE__*/React.createElement(Card, {
      interactive: true,
      onClick: () => onNavigate("Work")
    }, /*#__PURE__*/React.createElement("img", {
      className: "st-thumb",
      src: "../../assets/imagery/hero-build-169.png",
      alt: "Electronics bench"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "st-card__h"
    }, "Builds"), /*#__PURE__*/React.createElement("p", {
      className: "st-card__p"
    }, "Circuits, firmware and small tools. The engineering half of the degree, in public and unfinished.")), /*#__PURE__*/React.createElement(Card, {
      interactive: true,
      onClick: () => onNavigate("Counsel")
    }, /*#__PURE__*/React.createElement("img", {
      className: "st-thumb",
      src: "../../assets/imagery/hero-counsel-169.png",
      alt: "Quiet corner with tea"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "st-card__h"
    }, "Counsel"), /*#__PURE__*/React.createElement("p", {
      className: "st-card__p"
    }, "One-to-one sessions for immigrants, introverts and late bloomers. Plans you can keep on a bad week."))))), /*#__PURE__*/React.createElement("section", {
      className: "st-sect st-sect--plum"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-wrap st-grid2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-figblock"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/imagery/hero-planorama-11.png",
      alt: "Desk detail"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "st-kicker"
    }, "02 \u2014 The season loop"), /*#__PURE__*/React.createElement("h2", {
      className: "st-h2--tech st-h2"
    }, "PLAN \xB7 PLAY \xB7 REVIEW"), /*#__PURE__*/React.createElement("p", {
      className: "st-body",
      style: {
        marginTop: 18
      }
    }, "Ninety days, one theme, four areas. Quests are sized so that the worst version of you can still finish one. XP is the receipt."), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "26px 0 22px",
        maxWidth: 420
      }
    }, /*#__PURE__*/React.createElement(XPBar, {
      label: "Season 04 \xB7 Rebuild",
      value: 7200,
      max: 10000,
      size: "lg"
    })), /*#__PURE__*/React.createElement("div", {
      className: "st-metric"
    }, /*#__PURE__*/React.createElement(StatBlock, {
      label: "Seasons run",
      value: "04"
    }), /*#__PURE__*/React.createElement(StatBlock, {
      label: "People taught",
      value: "1,200+",
      tone: "amber"
    }), /*#__PURE__*/React.createElement(StatBlock, {
      label: "Quests cleared",
      value: "9,410",
      tone: "rose"
    }))))), /*#__PURE__*/React.createElement("section", {
      className: "st-sect"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-wrap st-grid2"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "st-kicker"
    }, "03 \u2014 Who it's for"), /*#__PURE__*/React.createElement("p", {
      className: "st-quote",
      style: {
        margin: "14px 0 22px"
      }
    }, "You are not behind. You were handed a harder map."), /*#__PURE__*/React.createElement("ul", {
      className: "st-list"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Glyph, {
      name: "heart",
      size: 20,
      glow: true
    }), "You moved countries and your plans didn't come with you."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Glyph, {
      name: "hourglass",
      size: 20,
      glow: true
    }), "You start at 34, or 41, or next Tuesday. Late is still a start."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Glyph, {
      name: "controller",
      size: 20,
      glow: true
    }), "You want structure that feels like a game, not a manager."))), /*#__PURE__*/React.createElement(Card, {
      lamp: true
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "amber"
    }, "Season 05 opens 1 October"), /*#__PURE__*/React.createElement("h3", {
      className: "st-card__h",
      style: {
        marginTop: 16,
        fontSize: 24
      }
    }, "Join the next season"), /*#__PURE__*/React.createElement("p", {
      className: "st-card__p",
      style: {
        marginBottom: 20
      }
    }, "Ninety days, a live cohort, and a plan sized to the life you actually have. 40 seats."), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "md"
    }, "Take a seat")))));
  }
  Object.assign(window, {
    HomePage
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PlanoramaPage.jsx
try { (() => {
// Kit file: wrapped in an IIFE so the design-system compiler does not export these
// screen components onto the public namespace. Shared names go on window explicitly.
(function () {
  const {
    Button,
    Card,
    Badge,
    Glyph,
    QuestCard,
    XPBar,
    LevelBadge,
    Tabs,
    Toast
  } = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44;
  function PlanoramaPage() {
    const [tab, setTab] = React.useState("Quests");
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
      className: "st-hero",
      style: {
        minHeight: 440
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/imagery/detail-planner-169.png",
      alt: "Planner spread"
    }), /*#__PURE__*/React.createElement("div", {
      className: "st-hero__scrim"
    }), /*#__PURE__*/React.createElement("div", {
      className: "st-wrap st-hero__body"
    }, /*#__PURE__*/React.createElement("span", {
      className: "st-kicker"
    }, "The product"), /*#__PURE__*/React.createElement("h1", {
      className: "st-h1",
      style: {
        fontFamily: "var(--font-tech)",
        fontWeight: 700,
        fontSize: 58
      }
    }, "PLANORAMA"), /*#__PURE__*/React.createElement("p", {
      className: "st-lede"
    }, "Quests instead of to-dos. XP instead of shame. Seasons instead of a year you already gave up on."), /*#__PURE__*/React.createElement("div", {
      className: "st-cta"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg"
    }, "Start Season 05"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "lg"
    }, "See a sample season")))), /*#__PURE__*/React.createElement("section", {
      className: "st-sect"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-sect__head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "st-kicker"
    }, "Inside the app"), /*#__PURE__*/React.createElement("h2", {
      className: "st-h2 st-h2--tech"
    }, "The game layer, all live type")), /*#__PURE__*/React.createElement(Tabs, {
      items: ["Quests", "Seasons", "Areas"],
      value: tab,
      onChange: setTab
    })), /*#__PURE__*/React.createElement("div", {
      className: "st-grid2",
      style: {
        gridTemplateColumns: "1.1fr 1fr"
      }
    }, /*#__PURE__*/React.createElement(Card, null, tab === "Quests" && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(QuestCard, {
      title: "Finish the ADC lab report",
      glyph: "rank-up",
      area: "Craft",
      xp: 120,
      due: "Today \xB7 45 min"
    }), /*#__PURE__*/React.createElement(QuestCard, {
      title: "Walk before the sun sets",
      glyph: "heart",
      area: "Body",
      xp: 40,
      due: "Today \xB7 20 min",
      done: true
    }), /*#__PURE__*/React.createElement(QuestCard, {
      title: "Send the two overdue invoices",
      glyph: "warning",
      area: "Money",
      xp: 60,
      due: "Overdue"
    })), tab === "Seasons" && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 22
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(LevelBadge, {
      level: 36,
      title: "Architect",
      size: "lg"
    }), /*#__PURE__*/React.createElement(Badge, {
      tone: "amber"
    }, "Day 26 / 90")), /*#__PURE__*/React.createElement(XPBar, {
      label: "Season XP",
      value: 7200,
      max: 10000,
      size: "lg"
    }), /*#__PURE__*/React.createElement(XPBar, {
      label: "Craft",
      value: 72,
      max: 100,
      size: "sm"
    }), /*#__PURE__*/React.createElement(XPBar, {
      label: "Body",
      value: 44,
      max: 100,
      size: "sm"
    })), tab === "Areas" && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, [["Craft", "rank-up", 72], ["Body", "heart", 44], ["People", "controller", 58], ["Money", "warning", 31]].map(([n, g, p]) => /*#__PURE__*/React.createElement("div", {
      key: n,
      style: {
        display: "flex",
        gap: 14,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Glyph, {
      name: g,
      size: 26,
      glow: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(XPBar, {
      label: n,
      value: p,
      max: 100,
      size: "sm"
    })))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "st-card__h",
      style: {
        fontSize: 24
      }
    }, "Quests are sized for your worst week"), /*#__PURE__*/React.createElement("p", {
      className: "st-body",
      style: {
        marginBottom: 22
      }
    }, "Every quest carries a life area, a time cost and an XP reward. If a quest can't be finished on a bad day, it isn't a quest yet \u2014 it's a project, and projects get broken down."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement(Toast, {
      tone: "xp",
      glyph: "trophy"
    }, "Quest complete \xB7 ", /*#__PURE__*/React.createElement("strong", null, "+120 XP")), /*#__PURE__*/React.createElement(Toast, {
      tone: "amber",
      glyph: "rank-up"
    }, "You reached ", /*#__PURE__*/React.createElement("strong", null, "LV 36"), " \u2014 Architect")))))), /*#__PURE__*/React.createElement("section", {
      className: "st-sect st-sect--plum"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-wrap st-grid3"
    }, [["Seasons, not years", "hourglass", "Ninety days is long enough to change something and short enough to survive."], ["Rest is on the board", "heart", "Rest days are logged like any other quest. Skipping them costs you streak, not the reverse."], ["Your vault is yours", "save", "Everything exports. No lock-in, no hostage data, no upsell to see your own history."]].map(([h, g, p]) => /*#__PURE__*/React.createElement(Card, {
      key: h
    }, /*#__PURE__*/React.createElement(Glyph, {
      name: g,
      size: 30,
      glow: true
    }), /*#__PURE__*/React.createElement("h3", {
      className: "st-card__h",
      style: {
        marginTop: 14
      }
    }, h), /*#__PURE__*/React.createElement("p", {
      className: "st-card__p"
    }, p))))), /*#__PURE__*/React.createElement("section", {
      className: "st-sect"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-wrap st-grid2"
    }, /*#__PURE__*/React.createElement(Card, {
      lamp: true
    }, /*#__PURE__*/React.createElement("span", {
      className: "st-kicker"
    }, "Season pass"), /*#__PURE__*/React.createElement("div", {
      className: "st-price",
      style: {
        margin: "10px 0 4px"
      }
    }, "$180", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "var(--text-muted)"
      }
    }, " / 90 days")), /*#__PURE__*/React.createElement("p", {
      className: "st-card__p",
      style: {
        margin: "12px 0 20px"
      }
    }, "Live cohort, weekly review calls, the full PLANORAMA vault template, and one 1:1 counsel session."), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "md"
    }, "Take a seat")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "st-h2"
    }, "If it doesn't survive a bad Tuesday, it isn't a system."), /*#__PURE__*/React.createElement("p", {
      className: "st-body",
      style: {
        marginTop: 16
      }
    }, "PLANORAMA is built from four seasons of my own collapsed plans. Every mechanic exists because something simpler failed first.")))));
  }
  Object.assign(window, {
    PlanoramaPage
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PlanoramaPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Site.jsx
try { (() => {
// Kit file: wrapped in an IIFE so the design-system compiler does not export these
// screen components onto the public namespace. Shared names go on window explicitly.
(function () {
  const {
    NavBar,
    Button,
    Switch
  } = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44;
  function WorkPage() {
    const {
      Card,
      Glyph
    } = window.WarmArcadeJazzyCelesicaDesignSystem_b48c44;
    return /*#__PURE__*/React.createElement("section", {
      className: "st-sect"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-wrap"
    }, /*#__PURE__*/React.createElement("span", {
      className: "st-kicker"
    }, "Builds \xB7 in public"), /*#__PURE__*/React.createElement("h2", {
      className: "st-h2 st-h2--tech",
      style: {
        marginBottom: 28
      }
    }, "UNFINISHED ON PURPOSE"), /*#__PURE__*/React.createElement("div", {
      className: "st-grid3"
    }, [["Analog front end, rev C", "detail-pcb-169.png", "A four-channel AFE for the lab bench. Rev C finally has a ground plane that isn't a prayer."], ["Mechanical keeb, quiet build", "action-keys-169.png", "Silent linears, plum keycaps, and a rose underglow that stops at 30% brightness."], ["The vault template", "detail-planner-169.png", "The Notion ancestor of PLANORAMA, still maintained for people who don't want an app."]].map(([h, img, p]) => /*#__PURE__*/React.createElement(Card, {
      key: h,
      interactive: true
    }, /*#__PURE__*/React.createElement("img", {
      className: "st-thumb",
      src: `../../assets/imagery/${img}`,
      alt: h
    }), /*#__PURE__*/React.createElement("h3", {
      className: "st-card__h"
    }, h), /*#__PURE__*/React.createElement("p", {
      className: "st-card__p"
    }, p))))));
  }
  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      className: "st-foot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-wrap st-footgrid"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "wa-nav__brand",
      style: {
        fontSize: 20
      }
    }, "JAZZY ", /*#__PURE__*/React.createElement("em", null, "CELESICA")), /*#__PURE__*/React.createElement("p", {
      className: "st-card__p",
      style: {
        marginTop: 12,
        maxWidth: "34ch"
      }
    }, "Warm, quietly confident systems for people who were handed a harder map.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      className: "st-footh"
    }, "Rooms"), /*#__PURE__*/React.createElement("div", {
      className: "st-footlist"
    }, /*#__PURE__*/React.createElement("span", null, "PLANORAMA"), /*#__PURE__*/React.createElement("span", null, "Builds"), /*#__PURE__*/React.createElement("span", null, "Counsel"), /*#__PURE__*/React.createElement("span", null, "Writing"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      className: "st-footh"
    }, "Elsewhere"), /*#__PURE__*/React.createElement("div", {
      className: "st-footlist"
    }, /*#__PURE__*/React.createElement("span", null, "Newsletter"), /*#__PURE__*/React.createElement("span", null, "Cohort"), /*#__PURE__*/React.createElement("span", null, "Contact")))));
  }
  function Site() {
    const [page, setPage] = React.useState("Home");
    const [light, setLight] = React.useState(false);
    React.useEffect(() => {
      document.documentElement.setAttribute("data-theme", light ? "light" : "dark");
    }, [light]);
    return /*#__PURE__*/React.createElement("div", {
      className: "st-page"
    }, /*#__PURE__*/React.createElement(NavBar, {
      logo: light ? "../../assets/logo/celesica-light.png" : "../../assets/logo/celesica-dark.png",
      brand: "JAZZY",
      accentWord: "CELESICA",
      links: ["Home", "PLANORAMA", "Work", "Counsel"],
      active: page,
      onNavigate: setPage,
      right: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Switch, {
        on: light,
        onChange: () => setLight(!light),
        label: light ? "Light" : "Dark"
      }), /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        onClick: () => setPage("Counsel")
      }, "Work with me"))
    }), page === "Home" && /*#__PURE__*/React.createElement(HomePage, {
      onNavigate: setPage
    }), page === "PLANORAMA" && /*#__PURE__*/React.createElement(PlanoramaPage, null), page === "Work" && /*#__PURE__*/React.createElement(WorkPage, null), page === "Counsel" && /*#__PURE__*/React.createElement(CounselPage, null), /*#__PURE__*/React.createElement(Footer, null));
  }
  Object.assign(window, {
    Site,
    WorkPage,
    Footer
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Site.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.GLYPH_NAMES = __ds_scope.GLYPH_NAMES;

__ds_ns.Glyph = __ds_scope.Glyph;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.List = __ds_scope.List;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.LevelBadge = __ds_scope.LevelBadge;

__ds_ns.QuestCard = __ds_scope.QuestCard;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.XPBar = __ds_scope.XPBar;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
