import React, { useEffect, useRef, useState } from "react";
import { useLazyGetJobsQuery } from "../../features/job/jobApi";
import JobsList from "../../component/job/JobList";

const MAX_HISTORY = 5;

export default function JobsContainer() {

  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("")
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  const handleOpenSearch = () => setSearchOpen(true);
  const handleCloseSearch = () => setSearchOpen(false);

  const [getJobs, { isFetching }] = useLazyGetJobsQuery();

  useEffect(() => {
    setSearchSuggestions(
      JSON.parse(localStorage.getItem("job_search_history")) || []
    );
    setLocationSuggestions(
      JSON.parse(localStorage.getItem("job_location_history")) || []
    );
  }, []);

  const handleApplyFilters = () => {
    setSearch(searchInput);
    setLocation(locationInput);

    saveToHistory("job_search_history", searchInput);
    saveToHistory("job_location_history", locationInput);

    // reset everything
    setJobs([]);
    setPage(1);
    setHasMore(true);
    setSearchOpen(false)
  };

  const saveToHistory = (key, value) => {
    if (!value) return;

    const prev = JSON.parse(localStorage.getItem(key)) || [];
    const updated = [value, ...prev.filter(v => v !== value)].slice(0, MAX_HISTORY);
    localStorage.setItem(key, JSON.stringify(updated));

    key === "job_search_history"
      ? setSearchSuggestions(updated)
      : setLocationSuggestions(updated);
  };

  /* ---------- FETCH JOBS ---------- */
  useEffect(() => {
    if (!hasMore) return;

    const loadJobs = async () => {
      try {
        const res = await getJobs({ page, limit: 10, search, location }).unwrap();

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
  }, [page, hasMore, getJobs, search, location]);

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
      searchInput={searchInput}
      locationInput={locationInput}
      setSearchInput={setSearchInput}
      setLocationInput={setLocationInput}
      searchSuggestions={searchSuggestions}
      locationSuggestions={locationSuggestions}
      onApply={handleApplyFilters}
      searchOpen={searchOpen}
      onOpenSearch={handleOpenSearch}
      onCloseSearch={handleCloseSearch}
    />
  );
}