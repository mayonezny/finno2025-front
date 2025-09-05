import type { WeeklyDataset } from './model/types';

export const august: WeeklyDataset = [
  /* ====================== 05 АВГУСТА ====================== */
  {
    date: '2025-08-05',
    report: {
      company: {
        name: 'ООО «Пирожки»',
        brand: 'Пирожки',
        industry: 'Пищевая промышленность (мучная продукция)',
        hq_city: 'Коломна',
        sales_region: ['Москва', 'Московская область'],
      },
      summary: {
        free_cash: { value: 39_000_000, change: -1_000_000 },
        undrawn_limits: { value: 83_000_000, change: 3_000_000 },
        liquidity_buffer_days: { value: 25, change: -1 },
        avg_daily_outflow: { value: 5_450_000, change: 50_000 },
        net_debt: { value: 150_000_000, change: 1_500_000 },
        ccc_days: { value: 38, change: 1 },
        dio_days: { value: 29, change: 1 },
        dpo_days: { value: 21, change: -1 },
        dso_days: { value: 31, change: 1 },
        debt_service_coverage_ratio: { value: 2.8, change: -0.1 },
        ebit: { value: 36_000_000, change: -1_000_000 },
        ebitda: { value: 52_000_000, change: -1_000_000 },
        ebitda_margin: { value: 0.2, change: -0.002 },
        cash_inflows_total: { value: 225_000_000, change: -2_000_000 },
        cash_outflows_total: { value: 212_000_000, change: -1_000_000 },
        hhi_customer: 0.19,
        wacd: 0.096,
      },
      revenue_block: {
        net_sales: { value: 225_000_000, change_pct: -0.9 },
      },
      debt_profile: [
        {
          date: '2025-08-06',
          type: 'кредит',
          amount: 900_000,
          info: {
            description: 'Кредит Сбербанк (оборотный)',
            issuer: 'Сбербанк',
            rate: 0.098,
            principal: 750_000,
            interest: 150_000,
            covenants: 'DSCR ≥ 1,2',
          },
        },
        {
          date: '2025-08-07',
          type: 'лизинг',
          amount: 230_000,
          info: {
            description: 'Автофургоны (парк)',
            issuer: 'ВТБ Лизинг',
            rate: 0.12,
            outstanding: 45_500_000,
          },
        },
        {
          date: '2025-08-08',
          type: 'кредит',
          amount: 1_200_000,
          info: {
            description: 'Кредит ВТБ (аннуитет)',
            issuer: 'ВТБ',
            rate: 0.102,
            principal: 980_000,
            interest: 220_000,
            covenants: 'Net Debt/EBITDA < 3,5',
          },
        },
        {
          date: '2025-08-09',
          type: 'лизинг',
          amount: 210_000,
          info: {
            description: 'Оборудование (печи)',
            issuer: 'Европлан',
            rate: 0.12,
            outstanding: 44_800_000,
          },
        },
        {
          date: '2025-08-10',
          type: 'кредит',
          amount: 650_000,
          info: {
            description: 'Сбербанк (bullet 2026 часть %)',
            issuer: 'Сбербанк',
            rate: 0.098,
            principal: 520_000,
            interest: 130_000,
            covenants: 'DSCR ≥ 1,2',
          },
        },
        {
          date: '2025-08-11',
          type: 'лизинг',
          amount: 200_000,
          info: {
            description: 'Линия упаковки',
            issuer: 'Европлан',
            rate: 0.12,
            outstanding: 44_500_000,
          },
        },
        {
          date: '2025-08-12',
          type: 'кредит',
          amount: 750_000,
          info: {
            description: 'ВТБ (аннуитет)',
            issuer: 'ВТБ',
            rate: 0.102,
            principal: 620_000,
            interest: 130_000,
            covenants: 'Net Debt/EBITDA < 3,5',
          },
        },
      ],
      cash_flow: {
        inflows: [
          { source: 'Поступления от сетей', amount: 200_000_000 },
          { source: 'Предоплата B2B', amount: 15_000_000 },
          { source: 'Прочие', amount: 10_000_000 },
        ],
        outflows: [
          { use: 'Сырьё и упаковка', amount: 62_000_000 },
          { use: 'Зарплата и налоги на ФОТ', amount: 37_000_000 },
          { use: 'Налоги (прочие)', amount: 30_000_000 },
          { use: 'Аренда и коммунальные', amount: 11_500_000 },
          { use: 'Логистика', amount: 8_500_000 },
          { use: 'Проценты и обслуживание', amount: 7_300_000 },
          { use: 'Прочие', amount: 15_700_000 },
        ],
      },
      profit: {
        amount: 6_300_000,
        daily: [
          { date: '2025-08-01', net_profit: 950_000 },
          { date: '2025-08-02', net_profit: 870_000 },
          { date: '2025-08-03', net_profit: 890_000 },
          { date: '2025-08-04', net_profit: 820_000 },
          { date: '2025-08-05', net_profit: 830_000 },
          { date: '2025-08-06', net_profit: 1_010_000 },
          { date: '2025-08-07', net_profit: 930_000 },
        ],
      },
      operations: [
        {
          date: '2025-08-02',
          description: 'Платёж по лизингу (автопарк)',
          category: 'Лизинг',
          amount: 230_000,
          receiver: 'ВТБ Лизинг',
          status: 'Выполнено',
        },
        {
          date: '2025-08-05',
          description: 'Оплата муки и масла',
          category: 'Покупка сырья',
          amount: 3_100_000,
          receiver: 'ООО «Коломенский Мелькомбинат»',
          status: 'Выполнено',
        },
        {
          date: '2025-08-07',
          description: 'Перечисление НДС (часть)',
          category: 'Налоги',
          amount: 2_600_000,
          receiver: 'ФНС',
          status: 'Выполнено',
        },
      ],
      counterparties: {
        customers: [
          { name: 'X5 Retail Group', share_of_sales: 0.45 },
          { name: 'АО «Тандер» (Магнит)', share_of_sales: 0.3 },
          { name: 'ООО «ВкусВилл»', share_of_sales: 0.15 },
          { name: 'Мелкие сети/HoReCa', share_of_sales: 0.1 },
        ],
        suppliers: [
          { name: 'ООО «Коломенский Мелькомбинат»', purchases_month: 9_100_000 },
          { name: 'ООО «Упаковка+»', purchases_month: 3_500_000 },
          { name: 'ПЭК Логистика', purchases_month: 1_900_000 },
        ],
      },
    },
  },

  /* ====================== 12 АВГУСТА ====================== */
  {
    date: '2025-08-12',
    report: {
      summary: {
        free_cash: { value: 40_500_000, change: 1_500_000 },
        undrawn_limits: { value: 82_000_000, change: -1_000_000 },
        liquidity_buffer_days: { value: 26, change: 1 },
        avg_daily_outflow: { value: 5_400_000, change: -50_000 },
        net_debt: { value: 147_000_000, change: -3_000_000 },
        ccc_days: { value: 37, change: -1 },
        dio_days: { value: 27, change: -2 },
        dpo_days: { value: 23, change: 2 },
        dso_days: { value: 32, change: 1 },
        debt_service_coverage_ratio: { value: 2.9, change: 0.1 },
        ebit: { value: 37_000_000, change: 1_000_000 },
        ebitda: { value: 53_500_000, change: 1_500_000 },
        ebitda_margin: { value: 0.205, change: 0.005 },
        cash_inflows_total: { value: 229_000_000, change: 4_000_000 },
        cash_outflows_total: { value: 214_500_000, change: 2_500_000 },
        hhi_customer: 0.19,
        wacd: 0.096,
      },
      revenue_block: {
        net_sales: { value: 229_000_000, change_pct: 1.8 },
      },
      debt_profile: [
        {
          date: '2025-08-13',
          type: 'лизинг',
          amount: 225_000,
          info: {
            description: 'Автофургоны (парк)',
            issuer: 'ВТБ Лизинг',
            rate: 0.12,
            outstanding: 45_100_000,
          },
        },
        {
          date: '2025-08-14',
          type: 'кредит',
          amount: 1_050_000,
          info: {
            description: 'Кредит ВТБ (аннуитет)',
            issuer: 'ВТБ',
            rate: 0.102,
            principal: 880_000,
            interest: 170_000,
            covenants: 'Net Debt/EBITDA < 3,5',
          },
        },
        {
          date: '2025-08-15',
          type: 'кредит',
          amount: 680_000,
          info: {
            description: 'Сбербанк (bullet 2026 часть %)',
            issuer: 'Сбербанк',
            rate: 0.098,
            principal: 540_000,
            interest: 140_000,
            covenants: 'DSCR ≥ 1,2',
          },
        },
        {
          date: '2025-08-16',
          type: 'лизинг',
          amount: 205_000,
          info: {
            description: 'Оборудование (печи)',
            issuer: 'Европлан',
            rate: 0.12,
            outstanding: 44_300_000,
          },
        },
        {
          date: '2025-08-17',
          type: 'кредит',
          amount: 820_000,
          info: {
            description: 'Сбербанк (оборотный)',
            issuer: 'Сбербанк',
            rate: 0.098,
            principal: 700_000,
            interest: 120_000,
            covenants: 'DSCR ≥ 1,2',
          },
        },
        {
          date: '2025-08-18',
          type: 'лизинг',
          amount: 210_000,
          info: {
            description: 'Линия упаковки',
            issuer: 'Европлан',
            rate: 0.12,
            outstanding: 44_000_000,
          },
        },
        {
          date: '2025-08-19',
          type: 'кредит',
          amount: 780_000,
          info: {
            description: 'ВТБ (аннуитет)',
            issuer: 'ВТБ',
            rate: 0.102,
            principal: 650_000,
            interest: 130_000,
            covenants: 'Net Debt/EBITDA < 3,5',
          },
        },
      ],
      cash_flow: {
        inflows: [
          { source: 'Поступления от сетей', amount: 203_000_000 },
          { source: 'Предоплата B2B', amount: 15_500_000 },
          { source: 'Прочие', amount: 10_500_000 },
        ],
        outflows: [
          { use: 'Сырьё и упаковка', amount: 63_000_000 },
          { use: 'Зарплата и налоги на ФОТ', amount: 37_500_000 },
          { use: 'Налоги (прочие)', amount: 30_500_000 },
          { use: 'Аренда и коммунальные', amount: 11_200_000 },
          { use: 'Логистика', amount: 8_800_000 },
          { use: 'Проценты и обслуживание', amount: 7_000_000 },
          { use: 'Прочие', amount: 16_500_000 },
        ],
      },
      profit: {
        amount: 6_700_000,
        daily: [
          { date: '2025-08-08', net_profit: 980_000 },
          { date: '2025-08-09', net_profit: 940_000 },
          { date: '2025-08-10', net_profit: 1_020_000 },
          { date: '2025-08-11', net_profit: 930_000 },
          { date: '2025-08-12', net_profit: 960_000 },
          { date: '2025-08-13', net_profit: 940_000 },
          { date: '2025-08-14', net_profit: 930_000 },
        ],
      },
      operations: [
        {
          date: '2025-08-11',
          description: 'Поступление оплаты от X5 (партия 27)',
          category: 'Поступление выручки',
          amount: 11_800_000,
          receiver: 'X5 Retail Group',
          status: 'Выполнено',
        },
        {
          date: '2025-08-13',
          description: 'Платёж по лизингу (автопарк)',
          category: 'Лизинг',
          amount: 225_000,
          receiver: 'ВТБ Лизинг',
          status: 'Выполнено',
        },
        {
          date: '2025-08-14',
          description: 'Оплата тары и этикеток',
          category: 'Покупка тары',
          amount: 1_150_000,
          receiver: 'ООО «Упаковка+»',
          status: 'Выполнено',
        },
      ],
      counterparties: {
        customers: [
          { name: 'X5 Retail Group', share_of_sales: 0.45 },
          { name: 'АО «Тандер» (Магнит)', share_of_sales: 0.3 },
          { name: 'ООО «ВкусВилл»', share_of_sales: 0.15 },
          { name: 'Мелкие сети/HoReCa', share_of_sales: 0.1 },
        ],
        suppliers: [
          { name: 'ООО «Коломенский Мелькомбинат»', purchases_month: 9_200_000 },
          { name: 'ООО «Упаковка+»', purchases_month: 3_550_000 },
          { name: 'ПЭК Логистика', purchases_month: 1_950_000 },
        ],
      },
    },
  },

  /* ====================== 19 АВГУСТА ====================== */
  {
    date: '2025-08-19',
    report: {
      summary: {
        free_cash: { value: 40_000_000, change: -500_000 },
        undrawn_limits: { value: 82_500_000, change: 500_000 },
        liquidity_buffer_days: { value: 26, change: 0.5 }, // дробные допустимы, округлишь в UI
        avg_daily_outflow: { value: 5_400_000, change: 0 },
        net_debt: { value: 147_000_000, change: 0 },
        ccc_days: { value: 35, change: -2 },
        dio_days: { value: 27, change: 0 },
        dpo_days: { value: 23, change: 0 },
        dso_days: { value: 31, change: -1 },
        debt_service_coverage_ratio: { value: 3.0, change: 0.1 },
        ebit: { value: 37_000_000, change: 0 },
        ebitda: { value: 54_500_000, change: 1_000_000 },
        ebitda_margin: { value: 0.207, change: 0.002 },
        cash_inflows_total: { value: 231_000_000, change: 2_000_000 },
        cash_outflows_total: { value: 218_000_000, change: 3_500_000 },
        hhi_customer: 0.19,
        wacd: 0.096,
      },
      revenue_block: {
        net_sales: { value: 231_000_000, change_pct: 0.9 },
      },
      debt_profile: [
        {
          date: '2025-08-20',
          type: 'кредит',
          amount: 1_150_000,
          info: {
            description: 'Кредит ВТБ (аннуитет)',
            issuer: 'ВТБ',
            rate: 0.102,
            principal: 950_000,
            interest: 200_000,
            covenants: 'Net Debt/EBITDA < 3,5',
          },
        },
        {
          date: '2025-08-21',
          type: 'лизинг',
          amount: 215_000,
          info: {
            description: 'Линия упаковки',
            issuer: 'Европлан',
            rate: 0.12,
            outstanding: 43_900_000,
          },
        },
        {
          date: '2025-08-22',
          type: 'кредит',
          amount: 700_000,
          info: {
            description: 'Сбербанк (оборотный)',
            issuer: 'Сбербанк',
            rate: 0.098,
            principal: 580_000,
            interest: 120_000,
            covenants: 'DSCR ≥ 1,2',
          },
        },
        {
          date: '2025-08-23',
          type: 'лизинг',
          amount: 205_000,
          info: {
            description: 'Оборудование (печи)',
            issuer: 'Европлан',
            rate: 0.12,
            outstanding: 43_700_000,
          },
        },
        {
          date: '2025-08-24',
          type: 'кредит',
          amount: 820_000,
          info: {
            description: 'Сбербанк (bullet 2026 часть %)',
            issuer: 'Сбербанк',
            rate: 0.098,
            principal: 680_000,
            interest: 140_000,
            covenants: 'DSCR ≥ 1,2',
          },
        },
        {
          date: '2025-08-25',
          type: 'лизинг',
          amount: 210_000,
          info: {
            description: 'Автофургоны (парк)',
            issuer: 'ВТБ Лизинг',
            rate: 0.12,
            outstanding: 43_500_000,
          },
        },
        {
          date: '2025-08-26',
          type: 'кредит',
          amount: 760_000,
          info: {
            description: 'ВТБ (аннуитет)',
            issuer: 'ВТБ',
            rate: 0.102,
            principal: 620_000,
            interest: 140_000,
            covenants: 'Net Debt/EBITDA < 3,5',
          },
        },
      ],
      cash_flow: {
        inflows: [
          { source: 'Поступления от сетей', amount: 205_000_000 },
          { source: 'Предоплата B2B', amount: 15_800_000 },
          { source: 'Прочие', amount: 10_200_000 },
        ],
        outflows: [
          { use: 'Сырьё и упаковка', amount: 64_000_000 },
          { use: 'Зарплата и налоги на ФОТ', amount: 38_000_000 },
          { use: 'Налоги (прочие)', amount: 30_800_000 },
          { use: 'Аренда и коммунальные', amount: 11_300_000 },
          { use: 'Логистика', amount: 9_100_000 },
          { use: 'Проценты и обслуживание', amount: 7_100_000 },
          { use: 'Прочие', amount: 17_700_000 },
        ],
      },
      profit: {
        amount: 7_200_000,
        daily: [
          { date: '2025-08-15', net_profit: 1_050_000 },
          { date: '2025-08-16', net_profit: 980_000 },
          { date: '2025-08-17', net_profit: 1_020_000 },
          { date: '2025-08-18', net_profit: 970_000 },
          { date: '2025-08-19', net_profit: 1_030_000 },
          { date: '2025-08-20', net_profit: 1_060_000 },
          { date: '2025-08-21', net_profit: 1_090_000 },
        ],
      },
      operations: [
        {
          date: '2025-08-18',
          description: 'Поступление оплаты от «Магнит» (партия 29)',
          category: 'Поступление выручки',
          amount: 9_900_000,
          receiver: 'АО «Тандер»',
          status: 'Выполнено',
        },
        {
          date: '2025-08-20',
          description: 'Закупка сахара и масла',
          category: 'Покупка сырья',
          amount: 1_750_000,
          receiver: 'ООО «РусАгроПродукт»',
          status: 'Выполнено',
        },
        {
          date: '2025-08-21',
          description: 'Платёж по лизингу (упаковочная линия)',
          category: 'Лизинг',
          amount: 215_000,
          receiver: 'Европлан',
          status: 'Выполнено',
        },
      ],
      counterparties: {
        customers: [
          { name: 'X5 Retail Group', share_of_sales: 0.45 },
          { name: 'АО «Тандер» (Магнит)', share_of_sales: 0.3 },
          { name: 'ООО «ВкусВилл»', share_of_sales: 0.15 },
          { name: 'Мелкие сети/HoReCa', share_of_sales: 0.1 },
        ],
        suppliers: [
          { name: 'ООО «Коломенский Мелькомбинат»', purchases_month: 9_300_000 },
          { name: 'ООО «Упаковка+»', purchases_month: 3_600_000 },
          { name: 'ПЭК Логистика', purchases_month: 2_000_000 },
        ],
      },
    },
  },

  /* ====================== 26 АВГУСТА (ИЗ КОНТЕКСТА) ====================== */
  {
    date: '2025-08-26',
    report: {
      summary: {
        free_cash: { value: 42_000_000, change: 1_500_000 }, // 40,5 -> 42,0
        undrawn_limits: { value: 80_000_000, change: -2_000_000 }, // 82,0 -> 80,0
        liquidity_buffer_days: { value: 27, change: 1 }, // 26 -> 27
        avg_daily_outflow: { value: 5_300_000, change: -100_000 }, // 5,4 -> 5,3
        net_debt: { value: 145_000_000, change: -2_000_000 }, // 147 -> 145
        ccc_days: { value: 36, change: 1 }, // 35 -> 36
        dio_days: { value: 28, change: 1 }, // 27 -> 28
        dpo_days: { value: 22, change: -1 }, // 23 -> 22
        dso_days: { value: 30, change: -1 }, // 31 -> 30
        debt_service_coverage_ratio: { value: 3.1, change: 0.1 }, // 3.0 -> 3.1
        ebit: { value: 38_000_000, change: 1_000_000 }, // 37 -> 38
        ebitda: { value: 55_000_000, change: 500_000 }, // 54.5 -> 55.0
        ebitda_margin: { value: 0.21, change: 0.003 }, // 20.7% -> 21.0%
        cash_inflows_total: { value: 236_000_000, change: 5_000_000 }, // 231 -> 236
        cash_outflows_total: { value: 221_000_000, change: 3_000_000 }, // 218 -> 221
        hhi_customer: 0.19,
        wacd: 0.096,
      },
      revenue_block: {
        net_sales: { value: 236_000_000, change_pct: 2.2 }, // (236-231)/231 ≈ 2.16%
      },
      debt_profile: [
        {
          date: '2025-08-27',
          type: 'кредит',
          amount: 1_000_000,
          info: {
            description: 'Кредит ВТБ (аннуитет)',
            issuer: 'ВТБ',
            rate: 0.102,
            principal: 820_000,
            interest: 180_000,
            covenants: 'Net Debt/EBITDA < 3,5',
          },
        },
        {
          date: '2025-08-28',
          type: 'кредит',
          amount: 700_000,
          info: {
            description: 'Сбербанк (bullet 2026 часть %)',
            issuer: 'Сбербанк',
            rate: 0.098,
            principal: 560_000,
            interest: 140_000,
            covenants: 'DSCR ≥ 1,2',
          },
        },
        {
          date: '2025-08-29',
          type: 'лизинг',
          amount: 240_000,
          info: {
            description: 'Автофургоны (парк)',
            issuer: 'ВТБ Лизинг',
            rate: 0.12,
            outstanding: 44_000_000,
          },
        },
        {
          date: '2025-08-30',
          type: 'лизинг',
          amount: 260_000,
          info: {
            description: 'Линия упаковки',
            issuer: 'Европлан',
            rate: 0.12,
            outstanding: 43_400_000,
          },
        },
        {
          date: '2025-08-31',
          type: 'кредит',
          amount: 850_000,
          info: {
            description: 'Сбербанк (оборотный)',
            issuer: 'Сбербанк',
            rate: 0.098,
            principal: 710_000,
            interest: 140_000,
            covenants: 'DSCR ≥ 1,2',
          },
        },
        {
          date: '2025-09-01',
          type: 'кредит',
          amount: 1_250_000,
          info: {
            description: 'Кредит ВТБ (аннуитет)',
            issuer: 'ВТБ',
            rate: 0.102,
            principal: 1_030_000,
            interest: 220_000,
            covenants: 'Net Debt/EBITDA < 3,5',
          },
        },
        {
          date: '2025-09-02',
          type: 'лизинг',
          amount: 210_000,
          info: {
            description: 'Оборудование (печи)',
            issuer: 'Европлан',
            rate: 0.12,
            outstanding: 43_100_000,
          },
        },
      ],
      cash_flow: {
        inflows: [
          { source: 'Поступления от сетей', amount: 210_000_000 },
          { source: 'Предоплата B2B', amount: 14_000_000 },
          { source: 'Прочие', amount: 12_000_000 },
        ],
        outflows: [
          { use: 'Сырьё (мука, масло, сахар)', amount: 15_000_000 },
          { use: 'Зарплата и налоги на ФОТ', amount: 10_000_000 },
          { use: 'Налоги (НДС, прибыль, страховые)', amount: 3_000_000 },
          { use: 'Аренда и коммунальные', amount: 2_000_000 },
          { use: 'Логистика', amount: 2_000_000 },
          { use: 'Проценты и обслуживание долга', amount: 5_000_000 },
        ],
      },
      profit: {
        amount: 8_200_000,
        daily: [
          { date: '2025-08-22', net_profit: 1_300_000 },
          { date: '2025-08-23', net_profit: 1_150_000 },
          { date: '2025-08-24', net_profit: 1_100_000 },
          { date: '2025-08-25', net_profit: 1_000_000 },
          { date: '2025-08-26', net_profit: 1_200_000 },
          { date: '2025-08-27', net_profit: 1_250_000 },
          { date: '2025-08-28', net_profit: 1_200_000 },
        ],
      },
      operations: [
        {
          date: '2025-08-26',
          description: 'Поступление оплаты от «ВкусВилл»',
          category: 'Поступление выручки',
          amount: 7_600_000,
          receiver: 'ООО «ВкусВилл»',
          status: 'Выполнено',
        },
        {
          date: '2025-08-27',
          description: 'Оплата упаковочных материалов',
          category: 'Покупка тары',
          amount: 1_200_000,
          receiver: 'ООО «Упаковка+»',
          status: 'Выполнено',
        },
        {
          date: '2025-08-29',
          description: 'Платёж по лизингу (рефрижераторы)',
          category: 'Лизинг',
          amount: 240_000,
          receiver: 'ВТБ Лизинг',
          status: 'Выполнено',
        },
        {
          date: '2025-08-30',
          description: 'Оплата электроэнергии',
          category: 'Коммунальные',
          amount: 540_000,
          receiver: 'ПАО «МОЭК»',
          status: 'Выполнено',
        },
      ],
      counterparties: {
        customers: [
          { name: 'X5 Retail Group', share_of_sales: 0.45 },
          { name: 'АО «Тандер» (Магнит)', share_of_sales: 0.3 },
          { name: 'ООО «ВкусВилл»', share_of_sales: 0.15 },
          { name: 'Мелкие сети/HoReCa', share_of_sales: 0.1 },
        ],
        suppliers: [
          { name: 'ООО «Коломенский Мелькомбинат»', purchases_month: 9_500_000 },
          { name: 'ООО «Упаковка+»', purchases_month: 3_650_000 },
          { name: 'ПЭК Логистика', purchases_month: 2_050_000 },
        ],
      },
    },
  },
];
