'use client'

import { useState } from 'react';
import { ChevronDown, ChevronRight, Search, Check, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

interface ActivityTypePickerProps {
    projectId: string;
}

const TYPES = [
    { value: 'project', label: 'Projects', description: 'A project was created, updated or deleted.' },
    { value: 'campaign', label: 'Campaigns', description: 'A campaign started, stopped or finished.' },
    { value: 'config', label: 'Configs', description: 'A config was added, updated or deleted.' },
];

export function ActivityTypePicker({ projectId }: ActivityTypePickerProps) {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const filteredTypes = TYPES.filter(type =>
        type.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        type.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleTypeSelect = (target: string) => {
        const params = new URLSearchParams(window.location.search);
        if (target) {
            setSelectedType(target);
            params.set('target_type', target);
            params.delete('page');
        } else {
            params.delete('target_type');
        }

        router.push(`/project/${projectId}/activity?${params.toString()}`);
    };

    return (
        <div className="border rounded-md bg-card">
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Type</span>
                </div>
                {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                ) : (
                    <ChevronRight className="h-4 w-4" />
                )}
            </button>

            {isExpanded && (
                <div className="border-t p-3 space-y-3">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search types..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-9 text-sm"
                        />
                    </div>

                    {/* Filter Options */}
                    <div className="max-h-56 overflow-y-auto space-y-1">
                        {filteredTypes.map((type) => {
                            const isSelected = selectedType === type.value;
                            return (
                                <div
                                    key={type.value}
                                    className="flex items-start gap-3 p-1.5 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                                    onClick={() => handleTypeSelect(type.value)}
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        {isSelected ? (
                                            <div className="h-4 w-4 rounded border border-primary bg-primary flex items-center justify-center">
                                                <Check className="h-3 w-3 text-primary-foreground" />
                                            </div>
                                        ) : (
                                            <div className="h-4 w-4 rounded border border-muted-foreground/30" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-sm font-medium text-foreground">
                                            {type.label}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {type.description}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredTypes.length === 0 && (
                            <div className="text-sm text-muted-foreground text-center py-4">
                                No types found matching &quot;{searchQuery}&quot;
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
