import ProjectCardSkeleton from "./project-card-skeleton";
import ProjectListSkeleton from "./project-list-skeleton";

export default function ProjectsViewSkeleton({ isGridView }: { isGridView: boolean }) {
    return (
        <>
            {isGridView ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ProjectCardSkeleton />
                    <ProjectCardSkeleton />
                    <ProjectCardSkeleton />
                </div>
            ) : (
                <>
                    <ProjectListSkeleton />
                    <ProjectListSkeleton />
                    <ProjectListSkeleton />
                </>
            )}
        </>
    );
}