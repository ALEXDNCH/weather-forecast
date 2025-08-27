import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { toDate, formatRuWeekday, formatRuDayMonth } from "@/utils/date";
import type { DateLike } from "@/utils/date/type.ts";

const OLD_TZ = process.env.TZ;

beforeAll(() => {
  process.env.TZ = "Europe/Moscow";
});

afterAll(() => {
  process.env.TZ = OLD_TZ;
});

describe("utils/date", () => {
  describe("toDate", () => {
    it("возвращает Date как есть", () => {
      const d = new Date(2025, 7, 25, 12, 0, 0);
      expect(toDate(d)).toBe(d);
    });

    it("конвертирует ISO-строку в Date", () => {
      const d = toDate("2025-08-25T00:00:00");
      expect(d).toBeInstanceOf(Date);
      expect(!isNaN(d.getTime())).toBe(true);
    });

    it("конвертирует timestamp (ms) в Date", () => {
      const ts = new Date(2025, 7, 25, 0, 0, 0).getTime();
      const d = toDate(ts);
      expect(d.getTime()).toBe(ts);
    });
  });

  describe("formatters (ru-RU lower)", () => {
    const localMidnightMsk = new Date(2025, 7, 25, 0, 0, 0);

    it("formatRuWeekdayLower — возвращает день недели в нижнем регистре", () => {
      const w = formatRuWeekday(localMidnightMsk);
      expect(w).toBe("понедельник");
      expect(w).toBe(w.toLowerCase());
    });

    it("formatRuDayMonthLower — возвращает '25 августа' в нижнем регистре", () => {
      const dm = formatRuDayMonth(localMidnightMsk);
      expect(dm).toBe("25 августа");
      expect(dm).toBe(dm.toLowerCase());
    });

    it("formatters принимают разные типы (Date | string | number)", () => {
      const inputs: DateLike[] = [
        localMidnightMsk,
        "2025-08-25T00:00:00",
        localMidnightMsk.getTime(),
      ];

      for (const input of inputs) {
        expect(formatRuWeekday(input)).toBe("понедельник");
        expect(formatRuDayMonth(input)).toBe("25 августа");
      }
    });
  });
});
