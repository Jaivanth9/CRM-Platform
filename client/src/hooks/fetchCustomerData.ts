"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type CustomerDetails = {
  custName: string;
  custEmail: string;
  spends: number;
  visits: number;
  lastVisits: string;
  shopName: string;
};

type FetchDataResponse = {
  data: CustomerDetails[] | null;
  error: string | null;
  loading: boolean;
};
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://crm-platform-dcbs.onrender.com";

const useFetchCustomerData = (): FetchDataResponse => {
  const [data, setData] = useState<CustomerDetails[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ shopname: string }>();
  const shopName = decodeURIComponent(params.shopname);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/getAllCustomerData`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ shopName }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData: CustomerDetails[] = await response.json();
        setData(responseData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default useFetchCustomerData;
