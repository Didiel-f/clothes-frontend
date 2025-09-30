import { useEffect, useState } from "react";
import { format } from "date-fns/format";

type State = { label: string; value: string };

export default function useDeliveryDate() {
  const [dates, setDates] = useState<State[]>([]);

  useEffect(() => {
    let list = [];
    let today = new Date();
    let dateCount = today.getDate();

    list.push({
      label: format(today, "dd MMMM"),
      value: today.toISOString()
    });

    for (let i = 1; i < 10; i++) {
      today.setDate(dateCount + i);
      list.push({ label: format(today, "dd MMMM"), value: today.toISOString() });
    }

    setDates(list);
  }, []);

  return { dates };
}
