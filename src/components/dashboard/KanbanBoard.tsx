
import { useState } from "react";

interface Deal {
  id: string;
  client: string;
  value: string;
  status: string;
  owner: string;
  avatar: string;
}

const columns = [
  { id: "new", title: "New", color: "bg-gray-100" },
  { id: "contacted", title: "Contacted", color: "bg-blue-100" },
  { id: "proposal", title: "Proposal", color: "bg-yellow-100" },
  { id: "negotiation", title: "Negotiation", color: "bg-orange-100" },
  { id: "closed", title: "Closed", color: "bg-green-100" },
];

const deals: { [key: string]: Deal[] } = {
  new: [
    { id: "1", client: "Acme Corp", value: "$25,000", status: "new", owner: "John Doe", avatar: "JD" },
    { id: "2", client: "Tech Solutions", value: "$15,000", status: "new", owner: "Jane Smith", avatar: "JS" },
  ],
  contacted: [
    { id: "3", client: "Global Industries", value: "$50,000", status: "contacted", owner: "Mike Johnson", avatar: "MJ" },
  ],
  proposal: [
    { id: "4", client: "StartupX", value: "$30,000", status: "proposal", owner: "Sarah Wilson", avatar: "SW" },
    { id: "5", client: "Enterprise LLC", value: "$75,000", status: "proposal", owner: "Tom Brown", avatar: "TB" },
  ],
  negotiation: [
    { id: "6", client: "Innovation Co", value: "$40,000", status: "negotiation", owner: "Alex Davis", avatar: "AD" },
  ],
  closed: [
    { id: "7", client: "Success Inc", value: "$60,000", status: "closed", owner: "Lisa Chen", avatar: "LC" },
  ],
};

export function KanbanBoard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Sales Pipeline</h2>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-72">
            <div className={`${column.color} rounded-lg p-3 mb-4`}>
              <h3 className="font-semibold text-gray-800">{column.title}</h3>
              <span className="text-sm text-gray-600">
                {deals[column.id]?.length || 0} deals
              </span>
            </div>
            
            <div className="space-y-3">
              {deals[column.id]?.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-900">{deal.client}</h4>
                    <span className="text-lg font-bold text-green-600">{deal.value}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      deal.status === "new" ? "bg-gray-100 text-gray-800" :
                      deal.status === "contacted" ? "bg-blue-100 text-blue-800" :
                      deal.status === "proposal" ? "bg-yellow-100 text-yellow-800" :
                      deal.status === "negotiation" ? "bg-orange-100 text-orange-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {deal.status}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {deal.avatar}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
