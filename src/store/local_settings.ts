import { createLocalStorage } from "@solid-primitives/storage"
import { isMobile } from "~/utils/compatibility"
import { players } from "../pages/home/previews/video_box"

const [local, setLocal, { remove, clear, toJSON }] = createLocalStorage()
// export function isValidKey(
//   key: string | number | symbol,
//   object: object
// ): key is keyof typeof object {
//   return key in object
// }

export const initialLocalSettings = [
  {
    key: "aria2_rpc_url",
    default: "http://localhost:6800/jsonrpc",
  },
  {
    key: "aria2_rpc_secret",
    default: "",
  },
  {
    key: "global_default_layout",
    default: "list",
    type: "select",
    options: ["list", "grid", "image"],
  },
  {
    key: "show_folder_in_image_view",
    default: "top",
    type: "select",
    options: ["top", "bottom", "none"],
  },
  {
    key: "show_sidebar",
    default: "none",
    type: "select",
    options: ["none", "visible"],
  },
  {
    key: "position_of_header_navbar",
    default: "static",
    type: "select",
    options: ["static", "sticky", "only_navbar_sticky"],
  },
  {
    key: "grid_item_size",
    default: "90",
    type: "number",
  },
  {
    key: "list_item_filename_overflow",
    default: "ellipsis",
    type: "select",
    options: ["ellipsis", "scrollable", "multi_line"],
  },
  {
    key: "open_item_on_checkbox",
    default: "direct",
    type: "select",
    options: () =>
      isMobile
        ? ["direct", "disable_while_checked"]
        : ["direct", "disable_while_checked", "with_alt", "with_ctrl"],
  },
  {
    key: "select_with_mouse",
    default: "disabled",
    type: "select",
    options: ["disabled", "open_item_with_dblclick"],
    hidden: isMobile,
  },
  {
    key: "context_menu_default_player",
    default: "none",
    type: "select",
    options: ["none"].concat(
      players.map((player) => {
        return player.name
      }),
    ),
  },
]
export type LocalSetting = (typeof initialLocalSettings)[number]
for (const setting of initialLocalSettings) {
  if (!local[setting.key]) {
    setLocal(setting.key, setting.default)
  }
}

export { local, setLocal, remove, clear, toJSON }
