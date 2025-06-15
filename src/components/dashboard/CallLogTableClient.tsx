"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Eye, FilterX, Search } from "lucide-react";
import { callStatuses, formatCurrency, formatDuration } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface CallLogTableClientProps {
  initialCalls: Call[];
}

type SortKey = keyof Pick<Call, "id" | "type" | "status" | "cost" | "timestamp">;

export const callTypes: CallType[] = ["webCall" , "phoneCall" , "Enquiry" , "Follow-up"];

export default function CallLogTableClient({ initialCalls }: CallLogTableClientProps) {
  const [calls, setCalls] = useState<Call[]>(initialCalls);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<CallType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<CallStatus | "all">("all");
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "ascending" | "descending" } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredAndSortedCalls = useMemo(() => {
    let SrtCalls = [...initialCalls];

    if (searchTerm) {
      SrtCalls = SrtCalls.filter(call =>
        call.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (call.patientName && call.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        call.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      SrtCalls = SrtCalls.filter(call => call.type === filterType);
    }

    if (filterStatus !== "all") {
      SrtCalls = SrtCalls.filter(call => call.status === filterStatus);
    }

    if (sortConfig !== null) {
      SrtCalls.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return SrtCalls;
  }, [initialCalls, searchTerm, filterType, filterStatus, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortConfig.direction === "ascending" ? "🔼" : "🔽";
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    setFilterStatus("all");
    setSortConfig(null);
  };
  
  const getStatusBadgeVariant = (status: CallStatus) => {
    switch (status) {
      case "Completed": return "default";
      case "Pending": return "secondary";
      case "Failed": return "destructive";
      case "Flagged by AI": return "destructive";
      case "Reviewed": return "outline";
      default: return "default";
    }
  };

  if (!isMounted) {
    // Render a skeleton or loading state
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="h-10 w-full sm:w-1/3 bg-muted rounded-md animate-pulse" />
          <div className="h-10 w-full sm:w-1/4 bg-muted rounded-md animate-pulse" />
          <div className="h-10 w-full sm:w-1/4 bg-muted rounded-md animate-pulse" />
        </div>
        <div className="h-64 w-full bg-muted rounded-md animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end p-4 border rounded-lg shadow-sm bg-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by ID, Patient, Summary..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div>
          <label htmlFor="filterType" className="block text-sm font-medium text-muted-foreground mb-1">Call Type</label>
          <Select value={filterType} onValueChange={(value) => setFilterType(value as CallType | "all")}>
            <SelectTrigger id="filterType">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {callTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="filterStatus" className="block text-sm font-medium text-muted-foreground mb-1">Call Status</label>
          <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as CallStatus | "all")}>
            <SelectTrigger id="filterStatus">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {callStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={clearFilters} variant="outline" className="w-full md:w-auto">
          <FilterX className="mr-2 h-4 w-4" /> Clear Filters
        </Button>
      </div>

      {filteredAndSortedCalls.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead onClick={() => requestSort("id")} className="cursor-pointer hover:bg-muted/50">
                  Call ID {getSortIndicator("id")}
                </TableHead> */}
                <TableHead onClick={() => requestSort("timestamp")} className="cursor-pointer hover:bg-muted/50">
                  Timestamp {getSortIndicator("timestamp")}
                </TableHead>
                <TableHead onClick={() => requestSort("type")} className="cursor-pointer hover:bg-muted/50">
                  Type {getSortIndicator("type")}
                </TableHead>
                 <TableHead>Patient</TableHead>
                <TableHead onClick={() => requestSort("status")} className="cursor-pointer hover:bg-muted/50">
                  Status {getSortIndicator("status")}
                </TableHead>
                <TableHead onClick={() => requestSort("cost")} className="text-right cursor-pointer hover:bg-muted/50">
                  Cost {getSortIndicator("cost")}
                </TableHead>
                <TableHead className="text-right">Duration</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedCalls.map((call) => (
                <TableRow key={call.id} className="hover:bg-muted/50 transition-colors">
                  {/* <TableCell className="font-medium">{call.id}</TableCell> */}
                  <TableCell>{new Date(call.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{call.type}</TableCell>
                  <TableCell>{call.patientName || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(call.status)}>{call.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(call.cost)}</TableCell>
                  <TableCell className="text-right">{call.duration}</TableCell>
                  <TableCell className="text-center">
                    <Button asChild variant="ghost" size="sm" className="text-primary hover:bg-primary hover:text-white">
                      <Link href={`/dashboard/calls/${call.id}`}>
                        <Eye className="mr-1 h-4 w-4" /> View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-foreground">No Calls Found</p>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
      
    </div>
  );
}
