import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useCafe } from "@/contexts/CafeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, Calendar, MessageSquare, RefreshCw } from "lucide-react";

export default function Admin() {
  const { cafeId } = useCafe();
  const [activeTab, setActiveTab] = useState("orders");

  const { data: orders, isLoading: ordersLoading, refetch: refetchOrders } = useQuery({
    queryKey: ["admin-orders", cafeId],
    queryFn: async () => {
      if (!cafeId) return [];
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("cafe_id", cafeId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!cafeId,
  });

  const { data: reservations, isLoading: reservationsLoading, refetch: refetchReservations } = useQuery({
    queryKey: ["admin-reservations", cafeId],
    queryFn: async () => {
      if (!cafeId) return [];
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("cafe_id", cafeId)
        .order("reservation_date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!cafeId,
  });

  const { data: messages, isLoading: messagesLoading, refetch: refetchMessages } = useQuery({
    queryKey: ["admin-messages", cafeId],
    queryFn: async () => {
      if (!cafeId) return [];
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .eq("cafe_id", cafeId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!cafeId,
  });

  if (!cafeId) return <div className="pt-32 text-center">Loading cafe context...</div>;

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-display font-bold gold-gradient-text">ADMIN DASHBOARD</h1>
          <p className="text-muted-foreground mt-2">Manage your restaurant orders, reservations, and messages.</p>
        </div>
        <button 
          onClick={() => { refetchOrders(); refetchReservations(); refetchMessages(); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-xl hover:bg-primary hover:text-black transition-all"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-black/40 border border-white/10 p-1 rounded-2xl">
          <TabsTrigger value="orders" className="rounded-xl px-6 py-2 gap-2">
            <ShoppingBag size={18} /> Orders
          </TabsTrigger>
          <TabsTrigger value="reservations" className="rounded-xl px-6 py-2 gap-2">
            <Calendar size={18} /> Reservations
          </TabsTrigger>
          <TabsTrigger value="messages" className="rounded-xl px-6 py-2 gap-2">
            <MessageSquare size={18} /> Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>A list of orders placed through the website.</CardDescription>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-white/10">
                      <TableHead>Order #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders?.map((order: any) => (
                      <TableRow key={order.id} className="border-white/10 hover:bg-white/5 transition-colors">
                        <TableCell className="font-mono text-xs">{order.order_number}</TableCell>
                        <TableCell>
                          <div className="font-medium">{order.customer_name}</div>
                          <div className="text-xs text-muted-foreground">{order.phone_number}</div>
                        </TableCell>
                        <TableCell className="capitalize">{order.order_type}</TableCell>
                        <TableCell>AED {order.total_amount}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize bg-primary/10 border-primary/30 text-primary">
                            {order.order_status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    {orders?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          No orders found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reservations">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle>Table Reservations</CardTitle>
              <CardDescription>Manage upcoming dining requests.</CardDescription>
            </CardHeader>
            <CardContent>
              {reservationsLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-white/10">
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations?.map((res: any) => (
                      <TableRow key={res.id} className="border-white/10 hover:bg-white/5 transition-colors">
                        <TableCell>{res.reservation_date}</TableCell>
                        <TableCell>{res.reservation_time}</TableCell>
                        <TableCell>
                          <div className="font-medium">{res.customer_name}</div>
                          <div className="text-xs text-muted-foreground">{res.phone_number}</div>
                        </TableCell>
                        <TableCell>{res.num_guests}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize bg-accent/10 border-accent/30 text-accent">
                            {res.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {reservations?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                          No reservations found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle>Customer Messages</CardTitle>
              <CardDescription>Inquiries and feedback from the contact form.</CardDescription>
            </CardHeader>
            <CardContent>
              {messagesLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {messages?.map((msg: any) => (
                    <div key={msg.id} className="p-6 rounded-2xl border border-white/10 bg-black/20 hover:border-primary/30 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-white">{msg.customer_name}</h4>
                          <p className="text-xs text-primary">{msg.customer_email}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-2 text-foreground">{msg.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-3">{msg.message}</p>
                    </div>
                  ))}
                  {messages?.length === 0 && (
                    <div className="col-span-2 text-center py-10 text-muted-foreground">
                      No messages found.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
