'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const GET_DOMAINS = gql`
  query GetDomains {
    domains {
      id
      name
      provider
      status
    }
  }
`;

const ADD_DOMAIN = gql`
  mutation AddDomain($name: String!, $provider: String!) {
    addDomain(name: $name, provider: $provider) {
      id
      name
      provider
      status
    }
  }
`;

const SWAP_DOMAIN_PROVIDER = gql`
  mutation SwapDomainProvider($id: ID!, $newProvider: String!) {
    swapDomainProvider(id: $id, newProvider: $newProvider) {
      id
      name
      provider
      status
    }
  }
`;

export default function DomainsPage() {
  const { loading, error, data, refetch } = useQuery(GET_DOMAINS);
  const [addDomain] = useMutation(ADD_DOMAIN);
  const [swapDomainProvider] = useMutation(SWAP_DOMAIN_PROVIDER);
  const [newDomainName, setNewDomainName] = useState('');
  const [newDomainProvider, setNewDomainProvider] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddDomain = async () => {
    try {
      await addDomain({ variables: { name: newDomainName, provider: newDomainProvider } });
      setNewDomainName('');
      setNewDomainProvider('');
      refetch();
      toast({
        title: "Domain added",
        description: "The new domain has been successfully added.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the domain. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSwapProvider = async (id: string, newProvider: string) => {
    try {
      await swapDomainProvider({ variables: { id, newProvider } });
      refetch();
      toast({
        title: "Provider swapped",
        description: "The domain provider has been successfully changed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to swap the domain provider. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Domains</h1>
      
      <div className="mb-4 flex space-x-2">
        <Input
          placeholder="Domain name"
          value={newDomainName}
          onChange={(e) => setNewDomainName(e.target.value)}
        />
        <Select onValueChange={setNewDomainProvider}>
          <SelectTrigger>
            <SelectValue placeholder="Select provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Vercel">Vercel</SelectItem>
            <SelectItem value="Netlify">Netlify</SelectItem>
            <SelectItem value="Cloudflare">Cloudflare</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleAddDomain}>Add Domain</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Domain</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.domains.map((domain) => (
            <TableRow key={domain.id}>
              <TableCell>{domain.name}</TableCell>
              <TableCell>{domain.provider}</TableCell>
              <TableCell>{domain.status}</TableCell>
              <TableCell>
                <Select onValueChange={(newProvider) => handleSwapProvider(domain.id, newProvider)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Swap provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vercel">Vercel</SelectItem>
                    <SelectItem value="Netlify">Netlify</SelectItem>
                    <SelectItem value="Cloudflare">Cloudflare</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}