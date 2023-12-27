import dayjs from "dayjs";

type EventInfo = {
    date: {
        year: number;
        month: number;
        day: number;
    }
    info: EventDayInfo;
}

export type EventDayInfo = {
    eventName: string;
    isHoliday: boolean; // 休日の場合, true
}

/**
 * 指定の年月のイベント日一覧を返す
 * @param year 
 * @param month 0開始 
 * @returns 
 */
export function getEventDaysOfMonth(year: number, month: number): EventInfo[] {
    const list: EventInfo[] = [];
    if (month === 0) {
        list.push({
            date: {
                year, month, day: 1,
            },
            info: {
                eventName: '元旦',
                isHoliday: true,
            }
        })

        // 成人の日
        // ～1999年：1/15
        // 2000年～：第2月曜日
        list.push({
            date: {
                year, month, 
                day: (year < 2000) ? 15 : getNumberWeekday(year, month, 1, 2).getDate(),
            },
            info: {
                eventName: '成人の日',
                isHoliday: true,
            }
        })

    } else if (month === 1) {
        // 健康記念日
        list.push({
            date: {
                year, month, day: 11,
            },
            info: {
                eventName: '建国記念日',
                isHoliday: true,
            }
        })

        // バレンタインデー
        list.push({
            date: {
                year, month, day: 14,
            },
            info: {
                eventName: 'バレンタインデー',
                isHoliday: false,
            }
        })

        // 天皇誕生日（令和）
        if (year >= 2019) {
            list.push({
                date: {
                    year, month, day: 23
                },
                info: {
                    eventName: '天皇誕生日',
                    isHoliday: true,
                }
            })
        }

    } else if (month === 2) {
        list.push({
            date: {
                year, month, day: 3
            },
            info: {
                eventName: 'ひなまつり',
                isHoliday: false,
            }
        })

        list.push({
            date: {
                year, month, day: 14
            },
            info: {
                eventName: 'ホワイトデー',
                isHoliday: false,
            }
        })

        list.push({
            date: {
                year, month,
                day: Math.floor(20.8431+0.242194*(year-1980) - Math.floor((year-1980)/4)),
            },
            info: {
                eventName: '春分の日',
                isHoliday: true,
            }
        })

    } else if (month === 3) {
        list.push({
            date: {
                year, month, day: 1
            },
            info: {
                eventName: 'エイプリルフール',
                isHoliday: false,
            }
        })

        list.push({
            date: {
                year, month, day: 29,
            },
            info: {
                eventName: function(){
                    if (year < 1989) return '天皇誕生日';
                    if (year < 2007) return 'みどりの日';
                    return '昭和の日'
                }(),
                isHoliday: true,
            }
        })

    } else if (month === 4) {
        list.push({
            date: {
                year, month, day: 3,
            },
            info: {
                eventName: '憲法記念日',
                isHoliday: true,
            }
        })

        list.push({
            date: {
                year, month, day: 4,
            },
            info: {
                eventName: 'みどりの日',
                isHoliday: true,
            }
        })

        list.push({
            date: {
                year, month, day: 5,
            },
            info: {
                eventName: 'こどもの日',
                isHoliday: true,
            }
        })

        list.push({
            date: {
                year, month,
                day: getNumberWeekday(year, month, 0, 2).getDate(),
            },
            info: {
                eventName: '母の日',
                isHoliday: false,
            }
        })

    } else if (month === 5) {
        list.push({
            date: {
                year, month,
                day: getNumberWeekday(year, month, 0, 3).getDate(), 
            },
            info: {
                eventName: '父の日',
                isHoliday: false,
            }
        })

    } else if (month === 6) {
        list.push({
            date: {
                year, month, day: 7
            },
            info: {
                eventName: '七夕',
                isHoliday: false,
            }
        })

        if (year === 2020) {
            list.push({
                date: {
                    year, month, day: 23,
                },
                info: {
                    eventName: '海の日',
                    isHoliday: true,
                }
            })

            list.push({
                date: {
                    year, month, day: 24,
                },
                info: {
                    eventName: 'スポーツの日',
                    isHoliday: true,
                }
            })

        } else if (year === 2021) {
            list.push({
                date: {
                    year, month, day: 22,
                },
                info: {
                    eventName: '海の日',
                    isHoliday: true,
                }
            })

            list.push({
                date: {
                    year, month, day: 23,
                },
                info: {
                    eventName: 'スポーツの日',
                    isHoliday: true,
                }
            })

        } else {

            list.push({
                date: {
                    year, month,
                    day: getNumberWeekday(year, month, 1, 3).getDate(),
                },
                info: {
                    eventName: '海の日',
                    isHoliday: true,
                }
            })
    
        }        

    } else if (month === 7) {
        list.push({
            date: {
                year, month,
                day: function() {
                    if (year === 2020) return 10;
                    if (year === 2021) return 8;
                    return 11;
                }()
            },
            info: {
                eventName: '山の日',
                isHoliday: true,
            }
        })

    } else if (month === 8) {
        list.push({
            date: {
                year, month,
                day: getNumberWeekday(year, month, 1, 3).getDate(),
            },
            info: {
                eventName: '敬老の日',
                isHoliday: true,
            }
        })

        list.push({
            date: {
                year, month,
                day: Math.floor(23.2488+0.242194*(year-1980) - Math.floor((year-1980)/4)),
            },
            info: {
                eventName: '秋分の日',
                isHoliday: true,
            }
        })

    } else if (month === 9) {
        list.push({
            date: {
                year, month,
                day: getNumberWeekday(year, month, 1, 2).getDate(),
            },
            info: {
                eventName: year < 2020 ? '体育の日' : 'スポーツの日',
                isHoliday: true,
            }
        })

        list.push({
            date: {
                year, month, day: 31,
            },
            info: {
                eventName: 'ハロウィン',
                isHoliday: false,
            }
        })

    } else if (month === 10) {
        list.push({
            date: {
                year, month, day: 3
            },
            info: {
                eventName: '文化の日',
                isHoliday: true,
            }
        })

        list.push({
            date: {
                year, month, day: 23
            },
            info: {
                eventName: '勤労感謝の日',
                isHoliday: true,
            }
        })

    } else if (month === 11) {
        if (year >= 1989 && year < 2019) {
            list.push({
                date: {
                    year, month, day: 23,
                },
                info: {
                    eventName: '天皇誕生日',
                    isHoliday: true,
                }
            })
        }

        list.push({
            date: {
                year, month, day: 25
            },
            info: {
                eventName: 'クリスマス',
                isHoliday: false,
            }
        })

        list.push({
            date: {
                year, month, day: 31
            },
            info: {
                eventName: '大晦日',
                isHoliday: false,
            }
        })

    }

    // 振替休日
    const sundayHolidays = list.filter(item => {
        if (!item.info.isHoliday) return false;
        const d = new Date(item.date.year, item.date.month, item.date.day);
        return d.getDay() === 0;
    });
    sundayHolidays.forEach(item => {
        list.push({
            date: {
                year: item.date.year,
                month: item.date.month,
                day: item.date.day + 1,
            },
            info: {
                eventName: '振替休日',
                isHoliday: true,
            }
        })
    })

    console.log('list', list);
    return list;
}

/**
 * 指定の年月の第n ○曜日を返す
 * @param year 
 * @param month 
 * @param weekday 0->Sunday, 1->Monday, ...
 * @param n 第n
 */
function getNumberWeekday(year: number, month:number, weekday: number, n: number): Date {
    const firstDay = new Date(year, month, 1);
    const fisrtWeekday = firstDay.getDay();
    // if (fisrtWeekday === weekday) {
    //     return firstDay;
    // }
    const d = dayjs(firstDay);
    let offset = 7 - (fisrtWeekday - weekday);
    if (offset > 6) {
        offset = offset - 7;
    }
    return d.add(offset, 'd').add(7 * (n - 1), 'd').toDate();
}
