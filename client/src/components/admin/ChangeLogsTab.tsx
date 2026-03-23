import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ChangeLogsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Logs</CardTitle>
        <CardDescription>View history of changes to the knowledge base</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-8">
          Change logs implementation coming soon.
        </div>
      </CardContent>
    </Card>
  );
};
