import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JobPreference from "../../component/job/JobPreference";

import { setCredentials } from "../../features/auth/authSlice";
import { useLazyGetRoleSkillSuggestionQuery, useSaveJobPreferenceMutation } from "../../features/job/jobApi";

export default function JobPreferenceContainer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    const [selected, setSelected] = useState([]); // always array
    const [search, setSearch] = useState("");

    const [fetchSuggestions, { data = [], isFetching }] =
        useLazyGetRoleSkillSuggestionQuery();

    const [savePref, { isLoading }] = useSaveJobPreferenceMutation();

    /* ---------------- SEARCH ---------------- */
    const handleSearch = (value) => {
        setSearch(value);

        if (value && value.length >= 1) {
            fetchSuggestions({ q: value });
        }
    };

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async () => {
        if (!selected || selected.length === 0) return;

        const roles = selected
            .filter((item) => item.type === "role")
            .map((item) => item.value);

        const skills = selected
            .filter((item) => item.type === "skill")
            .map((item) => item.value);

        try {
            await savePref({
                roleSlugs: roles,
                skillSlugs: skills,
            }).unwrap();

            // update redux user
            dispatch(
                setCredentials({
                    user: { ...user, hasCompletedPref: true },
                    accessToken: null, // token already stored
                })
            );

            navigate("/jobs", { replace: true });
        } catch (err) {
            console.error("Preference save failed", err);
        }
    };

    return (
        <JobPreference
            options={data || []}
            selected={selected}
            setSelected={setSelected}
            search={search}
            onSearch={handleSearch}
            onSubmit={handleSubmit}
            loading={isFetching || isLoading}
        />
    );
}
