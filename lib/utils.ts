import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CollabRole } from "./actions/roles";
import { PlayCircle, CheckCircle2, XCircle } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRoleName(role: CollabRole) {
  if (role.level === 1) {
    return "Read";
  } else if (role.level === 2) {
    return "Write";
  } else if (role.level === 3) {
    return "Owner";
  } else {
    return "Unknown";
  }
}

export function getActionLabel(action: string, targetId: string) {
  switch (action) {
    case "CONFIG_ADDED":
      return {
        prefix: 'added config ',
        suffix: ' to ',
        targetDisplay: targetId,
        href: ''
      };
    case "CONFIG_UPDATED":
      return {
        prefix: 'updated config ',
        suffix: ' in ',
        targetDisplay: targetId,
        href: ''
      };
    case "CONFIG_DELETED":
      return {
        prefix: 'deleted config ',
        suffix: ' from ',
        targetDisplay: targetId,
        href: ''
      };
    case "CORPUS_RENAMED":
      return {
        prefix: 'renamed corpus ',
        suffix: ' in ',
        targetDisplay: targetId,
        href: ''
      };
    case "CORPUS_DELETED":
      return {
        prefix: 'deleted corpus ',
        suffix: ' from ',
        targetDisplay: targetId,
        href: ''
      };
    case "CAMPAIGN_CREATED":
      return {
        prefix: 'created campaign ',
        suffix: ' in ',
        targetDisplay: targetId.substring(0, 8),
        href: `/campaign/${targetId}`
      };
    case "CAMPAIGN_CANCELED":
      return {
        prefix: 'Campaign ',
        suffix: ' canceled executing in ',
        targetDisplay: targetId.substring(0, 8),
        href: `/campaign/${targetId}`
      };
    case "CAMPAIGN_FINISHED":
      return {
        prefix: 'Campaign ',
        suffix: ' finished executing in ',
        targetDisplay: targetId.substring(0, 8),
        href: `/campaign/${targetId}`
      };
    case "CAMPAIGN_STARTED":
      return {
        prefix: 'Campaign ',
        suffix: ' started executing in ',
        targetDisplay: targetId.substring(0, 8),
        href: `/campaign/${targetId}`
      };
    default:
      return {
        prefix: '',
        suffix: '',
        targetDisplay: targetId,
        href: ''
      };
  }
}

export const getActionIcon = (action: string) => {
  switch (action) {
    case "CAMPAIGN_STARTED":
      return PlayCircle;
    case "CAMPAIGN_FINISHED":
      return CheckCircle2;
    case "CAMPAIGN_CANCELED":
      return XCircle;
    default:
      return null;
  }
}