import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PulumiConfigPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Pulumi Configuration</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" placeholder="Enter project name" />
            </div>
            <div>
              <Label htmlFor="stackName">Stack Name</Label>
              <Input id="stackName" placeholder="Enter stack name" />
            </div>
            <div>
              <Label htmlFor="cloudProvider">Cloud Provider</Label>
              <Select>
                <SelectTrigger id="cloudProvider">
                  <SelectValue placeholder="Select cloud provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aws">AWS</SelectItem>
                  <SelectItem value="azure">Azure</SelectItem>
                  <SelectItem value="gcp">Google Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Create Project</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resource Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="resourceType">Resource Type</Label>
              <Select>
                <SelectTrigger id="resourceType">
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vm">Virtual Machine</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="resourceName">Resource Name</Label>
              <Input id="resourceName" placeholder="Enter resource name" />
            </div>
            <Button type="submit">Add Resource</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}