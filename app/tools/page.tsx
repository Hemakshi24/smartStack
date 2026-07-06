import { ToolsWorkbench } from "@/components/tools-workbench";

export const metadata = {
  title: "Developer Utilities",
  description: "Local-first JSON formatter, Base64, URL encoder, regex tester, hash generator, UUID, JWT decoder, password generator, markdown preview, and color picker.",
};

export default function ToolsPage() {
  return <ToolsWorkbench />;
}
