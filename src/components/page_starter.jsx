"use client";
import { FadeIn } from "@/animations";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

const PageStarter = ({ data, faqs, setSearch, isSearch, search }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);
  const { lang } = useAppContext();
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearch(term);
    const searchWords = term.split(" ").filter((word) => word.trim() !== "");

    const exactMatches = faqs.filter(
      (item) =>
        item?.question.toLowerCase().includes(term) ||
        item?.search_answer.toLowerCase().includes(term)
    );

    const partialMatches = faqs
      .filter(
        (item) =>
          !item?.question.toLowerCase().includes(term) &&
          !item?.search_answer.toLowerCase().includes(term) &&
          searchWords.some(
            (searchWord) =>
              item?.question.toLowerCase().includes(searchWord) ||
              item?.search_answer.toLowerCase().includes(searchWord)
          )
      )
      .sort((a, b) => {
        const aMatches = searchWords.filter(
          (word) =>
            a.question.toLowerCase().includes(word) ||
            a.search_answer.toLowerCase().includes(word)
        ).length;
        const bMatches = searchWords.filter(
          (word) =>
            b.question.toLowerCase().includes(word) ||
            b.search_answer.toLowerCase().includes(word)
        ).length;
        return bMatches - aMatches;
      });

    setSuggestions([...exactMatches, ...partialMatches]);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    router.push(`/faq/${suggestion?. slug}`);
  };

  const highlightText = (text, searchWords) => {
    if (!searchWords.length) return text;
    const regex = new RegExp(`(${searchWords.join("|")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, idx) =>
      regex.test(part) ? (
        <strong key={idx} style={{ backgroundColor: "#6BD38E" }}>
          {part}
        </strong>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-[1440px] w-full rounded-md">
      <FadeIn>
        <div className="px-3 md:px-20 relative flex justify-center items-center flex-col">
          <p className="text-green1 font-medium text-lg text-center font-poppins">
            {data?.page}
          </p>
          <h1 className="text-primary text-[42px] sm:text-[56px] font-semibold font-plus text-center mt-2">
            {data?.title}
          </h1>
          <p className="text-third leading-7 font-medium text-center mb-4 mt-2 font-poppins mx-3 sm:mx-8 lg:mx-48">
            {data?.description}
          </p>
          {isSearch && (
            <div
              className="relative flex justify-center items-center w-full sm:w-[500px]"
              ref={searchRef}
            >
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
                onFocus={() => setShowSuggestions(!!search)}
                className="py-2 px-10 border w-full border-gray-300 rounded-md focus:outline-none"
              />
              {lang === "ar" ? (
                <>
                  <svg
                    className="h-5 w-5 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 19.9 19.7"
                  >
                    <g fill="none" stroke="#848F91">
                      <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
                      <circle cx="8" cy="8" r="7" />
                    </g>
                  </svg>
                  {search && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:bg-gray-200 hover:rounded-full hover:p-1 transition-all duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => setSearch("")}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 19.9 19.7"
                  >
                    <g fill="none" stroke="#848F91">
                      <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
                      <circle cx="8" cy="8" r="7" />
                    </g>
                  </svg>
                  {search && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:bg-gray-200 hover:rounded-full hover:p-1 transition-all duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => setSearch("")}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </>
              )}
              {search && showSuggestions && suggestions.length !== 0 && (
                <ul className="absolute left-0 right-0 top-full bg-white border border-gray-300 rounded-b-md shadow-md mt-1 z-10 max-h-80 overflow-y-scroll">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="py-2 px-4 mx-4 my-4 cursor-pointer border-2 border-gray-300 hover:bg-gray-100 rounded-md"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div>
                        <p className="font-semibold">
                          {suggestion?.question
                            .split(" ")
                            .map((word, idx) => (
                              <React.Fragment key={idx}>
                                {highlightText(
                                  word,
                                  search.split(" ").filter(Boolean)
                                )}{" "}
                              </React.Fragment>
                            ))}
                        </p>
                        <p>
                          {suggestion?.search_answer
                            .split(" ")
                            .map((word, idx) => (
                              <React.Fragment key={idx}>
                                {highlightText(
                                  word,
                                  search.split(" ").filter(Boolean)
                                )}{" "}
                              </React.Fragment>
                            ))}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {search && showSuggestions && suggestions.length === 0 && (
                <ul className="absolute left-0 right-0 top-full bg-white border border-gray-300 rounded-b-md shadow-md mt-1 z-10">
                  <li className="py-2 px-4">Not found</li>
                </ul>
              )}
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
};

export default PageStarter;
