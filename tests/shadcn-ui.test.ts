import { describe, it, expect } from "vitest";
import * as fs from "fs";

describe("shadcn/ui Configuration", () => {
  describe("Configuration File", () => {
    it("should have components.json in project root", () => {
      expect(fs.existsSync("components.json")).toBe(true);
    });

    it("should configure RSC compatibility", () => {
      const config = JSON.parse(fs.readFileSync("components.json", "utf-8"));
      expect(config.rsc).toBe(true);
    });

    it("should use TypeScript (tsx)", () => {
      const config = JSON.parse(fs.readFileSync("components.json", "utf-8"));
      expect(config.tsx).toBe(true);
    });

    it("should configure CSS variables", () => {
      const config = JSON.parse(fs.readFileSync("components.json", "utf-8"));
      expect(config.tailwind.cssVariables).toBe(true);
    });

    it("should point to correct CSS file", () => {
      const config = JSON.parse(fs.readFileSync("components.json", "utf-8"));
      expect(config.tailwind.css).toBe("src/styles/globals.css");
    });

    it("should use lucide icons", () => {
      const config = JSON.parse(fs.readFileSync("components.json", "utf-8"));
      expect(config.iconLibrary).toBe("lucide");
    });

    it("should have correct component aliases", () => {
      const config = JSON.parse(fs.readFileSync("components.json", "utf-8"));
      expect(config.aliases.components).toBe("~/components");
      expect(config.aliases.ui).toBe("~/components/ui");
      expect(config.aliases.utils).toBe("~/lib/utils");
    });
  });

  describe("Essential Components", () => {
    it("should have button component", () => {
      expect(fs.existsSync("src/components/ui/button.tsx")).toBe(true);
    });

    it("should have input component", () => {
      expect(fs.existsSync("src/components/ui/input.tsx")).toBe(true);
    });

    it("should have label component", () => {
      expect(fs.existsSync("src/components/ui/label.tsx")).toBe(true);
    });

    it("should have card component", () => {
      expect(fs.existsSync("src/components/ui/card.tsx")).toBe(true);
    });

    it("should have dialog component", () => {
      expect(fs.existsSync("src/components/ui/dialog.tsx")).toBe(true);
    });

    it("should have dropdown-menu component", () => {
      expect(fs.existsSync("src/components/ui/dropdown-menu.tsx")).toBe(true);
    });

    it("should have sonner (toast) component", () => {
      expect(fs.existsSync("src/components/ui/sonner.tsx")).toBe(true);
    });

    it("should have form component", () => {
      expect(fs.existsSync("src/components/ui/form.tsx")).toBe(true);
    });
  });

  describe("Component Structure", () => {
    it("should have ui components directory", () => {
      expect(fs.existsSync("src/components/ui")).toBe(true);
    });

    it("should have utils file", () => {
      expect(fs.existsSync("src/lib/utils.ts")).toBe(true);
    });

    it("should export cn function from utils", () => {
      const utilsCode = fs.readFileSync("src/lib/utils.ts", "utf-8");
      expect(utilsCode).toContain("export function cn");
    });

    it("should use clsx and tailwind-merge in utils", () => {
      const utilsCode = fs.readFileSync("src/lib/utils.ts", "utf-8");
      expect(utilsCode).toContain("clsx");
      expect(utilsCode).toContain("twMerge");
    });
  });

  describe("CSS Variables", () => {
    it("should have CSS variables in globals.css", () => {
      const css = fs.readFileSync("src/styles/globals.css", "utf-8");
      expect(css).toContain(":root");
      expect(css).toContain("--background");
      expect(css).toContain("--foreground");
    });

    it("should have dark mode variables", () => {
      const css = fs.readFileSync("src/styles/globals.css", "utf-8");
      expect(css).toContain(".dark");
    });

    it("should have primary color variables", () => {
      const css = fs.readFileSync("src/styles/globals.css", "utf-8");
      expect(css).toContain("--primary");
      expect(css).toContain("--primary-foreground");
    });

    it("should have chart colors for visualizations", () => {
      const css = fs.readFileSync("src/styles/globals.css", "utf-8");
      expect(css).toContain("--chart-1");
      expect(css).toContain("--chart-2");
      expect(css).toContain("--chart-3");
    });
  });

  describe("Supporting Libraries", () => {
    it("should have lucide-react installed", () => {
      const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
      expect(packageJson.dependencies["lucide-react"]).toBeDefined();
    });

    it("should have framer-motion installed", () => {
      const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
      expect(packageJson.dependencies["framer-motion"]).toBeDefined();
    });

    it("should have recharts installed", () => {
      const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
      expect(packageJson.dependencies["recharts"]).toBeDefined();
    });
  });

  describe("Test Page", () => {
    it("should have component test page", () => {
      expect(fs.existsSync("src/app/component-test/page.tsx")).toBe(true);
    });

    it("should import shadcn/ui components in test page", () => {
      const pageCode = fs.readFileSync(
        "src/app/component-test/page.tsx",
        "utf-8"
      );
      expect(pageCode).toContain("~/components/ui/button");
      expect(pageCode).toContain("~/components/ui/input");
      expect(pageCode).toContain("~/components/ui/card");
      expect(pageCode).toContain("~/components/ui/dialog");
    });

    it("should use lucide-react icons in test page", () => {
      const pageCode = fs.readFileSync(
        "src/app/component-test/page.tsx",
        "utf-8"
      );
      expect(pageCode).toContain("lucide-react");
      expect(pageCode).toContain("<User");
      expect(pageCode).toContain("<Settings");
    });

    it("should use framer-motion in test page", () => {
      const pageCode = fs.readFileSync(
        "src/app/component-test/page.tsx",
        "utf-8"
      );
      expect(pageCode).toContain("framer-motion");
      expect(pageCode).toContain("<motion.");
    });
  });

  describe("Layout Configuration", () => {
    it("should have app router layout", () => {
      expect(fs.existsSync("src/app/layout.tsx")).toBe(true);
    });

    it("should include Toaster in layout", () => {
      const layoutCode = fs.readFileSync("src/app/layout.tsx", "utf-8");
      expect(layoutCode).toContain("<Toaster");
    });

    it("should have Toaster in _app.tsx for pages router", () => {
      const appCode = fs.readFileSync("src/pages/_app.tsx", "utf-8");
      expect(appCode).toContain("<Toaster");
    });
  });
});
