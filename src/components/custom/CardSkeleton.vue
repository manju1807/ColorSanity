<script setup lang="ts">
import { Skeleton } from "../ui/skeleton";
defineOptions({
	name: "CardSkeleton",
});
</script>
<template>
  <div className="rounded-lg bg-card overflow-hidden animate-pulse">
    <Skeleton className="h-48" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
</template>
