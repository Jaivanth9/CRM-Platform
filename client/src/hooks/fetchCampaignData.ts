import { useEffect, useState } from "react";

interface CampaignDetails {
  custName: string;
  custEmail: string;
  status: string;
}

type FetchDataResponse = {
  data: CampaignDetails[] | null;
  error: string | null;
  loading: boolean;
};
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://crm-platform-dcbs.onrender.com";

const useFetchCampaignData = (): FetchDataResponse => {
  const [data, setData] = useState<CampaignDetails[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getAllCampaignData`, {
          method: "GET",
        }); 
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setData(responseData);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchCampaignData;
