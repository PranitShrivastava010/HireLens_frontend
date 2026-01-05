import React, { useEffect, useRef, useState } from "react";
import { useLazyGetJobsQuery } from "../../features/job/jobApi";
import JobsList from "../../component/job/JobList";

export default function JobsContainer() {
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  const [getJobs, { isFetching }] = useLazyGetJobsQuery();

  /* ---------- FETCH JOBS ---------- */
  useEffect(() => {
    if (!hasMore) return;

    const loadJobs = async () => {
      try {
        const res = await getJobs({ page, limit: 10 }).unwrap();

        // ⛔ Backend returned no jobs
        if (res.jobs.length === 0) {
          setHasMore(false);
          return;
        }

        setJobs(prev => [...prev, ...res.jobs]);

        // ⛔ Last page reached
        if (res.meta.page >= res.meta.totalPages) {
          setHasMore(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadJobs();
  }, [page, hasMore, getJobs]);

  /* ---------- INFINITE SCROLL ---------- */
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !isFetching &&
          hasMore
        ) {
          setPage(prev => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      }
    );

    observerRef.current.observe(loaderRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isFetching, hasMore]);

  return (
    <JobsList
      jobs={jobs}
      loading={isFetching}
      loaderRef={loaderRef}
      hasMore={hasMore}
    />
  );
}


