/* import React from "react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { useEffect } from "react";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    useEffect(() => {
        if (selectedConversation) {
            setSearch("");
        }
    }, [selectedConversation]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search query must be at least 3 characters");
        }

        const userConversation = conversations.users.find((c) => {
            return c.fullName.toLowerCase().includes(search.toLowerCase());
        });

        const groupConversation = conversations.groupChats.find((c) => {
            return c.name.toLowerCase().includes(search.toLowerCase());
        });

        const conversation = userConversation || groupConversation;

        if (conversation) {
            // Create a new object with the updated isGroup property
            const updatedConversation = {
                ...conversation,
                isGroup: !!groupConversation,
            };
            setSelectedConversation(updatedConversation);
        } else {
            toast.error("User not found");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search1">
            <input
                type="text"
                placeholder="Search..."
                className="search2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="search3">
                <FaSearch />
            </button>
        </form>
    );
};
export default SearchInput; */

/* import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    useEffect(() => {
        if (selectedConversation) {
            setSearch("");
        }
    }, [selectedConversation]);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value.length >= 1) {
            const userSuggestions = conversations.users.filter((c) =>
                c.fullName.toLowerCase().includes(e.target.value.toLowerCase())
            );
            const groupSuggestions = conversations.groupChats.filter((g) =>
                g.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            const newSuggestions = [...userSuggestions, ...groupSuggestions];
            setSuggestions(newSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const isGroup = "name" in suggestion;
        const updatedConversation = {
            ...suggestion,
            isGroup: isGroup,
        };
        setSelectedConversation(updatedConversation);
        setSearch("");
        setSuggestions([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search query must be at least 3 characters");
        }
        handleSuggestionClick(suggestions[0]);
    };

    return (
        <form onSubmit={handleSubmit} className="search1">
            <input
                type="text"
                placeholder="Search..."
                className="search2"
                value={search}
                onChange={handleInputChange}
            />
            <div className="autocomplete-dropdown">
                {suggestions.map((suggestion, index) => (
                    <div
                        key={`${index}-${suggestion.id}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                        {suggestion.fullName || suggestion.name}
                    </div>
                ))}
            </div>
            <button type="submit" className="search3">
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchInput; */

import React, { useState, useEffect } from "react";
import Select from "react-select";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (selectedConversation) {
            setSelectedOption(null);
        }
    }, [selectedConversation]);

    const options = [
        ...(conversations?.users?.map((user) => ({
            value: user,
            label: user.fullName,
            isGroup: false,
        })) || []),
        ...(conversations?.groupChats?.map((group) => ({
            value: group,
            label: group.name,
            isGroup: true,
        })) || []),
    ];

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        const updatedConversation = {
            ...selectedOption.value,
            isGroup: selectedOption.isGroup,
        };
        setSelectedConversation(updatedConversation);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedOption) return;
        if (selectedOption.label.length < 3) {
            return toast.error("Search query must be at least 3 characters");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search1">
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                className="search2"
                placeholder="Search..."
                isSearchable
            />
            <button type="submit" className="search3"></button>
        </form>
    );
};

export default SearchInput;
