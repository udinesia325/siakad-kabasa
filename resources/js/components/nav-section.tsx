import { ChevronRight } from 'lucide-react';
import { NavItem } from '@/components/nav-item';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useSidebarState } from '@/hooks/use-sidebar-state';
import type { NavSection as NavSectionType } from '@/types';

type Props = {
    section: NavSectionType;
};

export function NavSection({ section }: Props) {
    if (section.hidden) {
        return null;
    }

    if (!section.collapsible) {
        return <FlatSection section={section} />;
    }

    return <CollapsibleSection section={section} />;
}

function FlatSection({ section }: Props) {
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarMenu>
                {section.items.map((item) => (
                    <NavItem key={item.title} item={item} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function CollapsibleSection({ section }: Props) {
    const { isCurrentUrl } = useCurrentUrl();
    const hasActiveChild = section.items.some((item) => {
        if (isCurrentUrl(item.href)) {
            return true;
        }

        return (item.children ?? []).some((child) => isCurrentUrl(child.href));
    });

    const [open, setOpen] = useSidebarState(
        'group',
        section.key,
        section.defaultOpen ?? true,
        hasActiveChild,
    );

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className="group/section"
        >
            <SidebarGroup className="px-2 py-0">
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex w-full items-center">
                        {section.label}
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/section:rotate-90" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {section.items.map((item) => (
                                <NavItem key={item.title} item={item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    );
}
