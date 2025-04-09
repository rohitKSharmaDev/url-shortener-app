import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import Error from "@/components/Error";
import { useFetch } from "@/hooks/UseFetch";
import { getUrls } from "@/db/apiUrls";
import { UrlState } from "@/Context";
import { getClicksForUrls } from "@/db/apiClicks";
import LinkCard from "@/components/LinkCard";

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { user } = UrlState();
  const userId = user?.id || "";

  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls);
  const { loading: loadingClicks, data: clicks, fn: fnClicks } = useFetch(getClicksForUrls);

  useEffect(() => {
    if (userId) {
      fnUrls(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (urls?.length) {
      fnClicks(urls.map((url) => url.id));
    }
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) => {
    return url.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && <BarLoader width={"100%"} color="#36d7b7" />}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>

      </div>

      <div>
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <Button>Create Link</Button>
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url, i) => {
        return <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      })}
    </div>
  );
};

export default DashboardPage;