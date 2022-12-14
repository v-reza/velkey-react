/* eslint-disable jsx-a11y/no-redundant-roles */
import { CircularProgress, LinearProgress, Skeleton } from "@mui/material";
import React, { Suspense } from "react";
import { format } from "timeago.js";
import {
  ExternalLinkIcon,
  CashIcon,
  SaveIcon,
  OfficeBuildingIcon,
  BriefcaseIcon,
  EyeIcon,
} from "@heroicons/react/outline";
import InformationSalary from "./InformationSalary";
import AboutCompany from "./AboutCompany";
import useAuth from "../../../../../hooks/useAuth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const JobDetail = ({ jobs, setOpen, setJobApply, isJobLoading }) => {
  const navigation = [
    { name: jobs?.jobType, href: "#", icon: BriefcaseIcon, current: true },
    {
      name: jobs?.company?.companyMembers.length + " Employees",
      href: "#",
      icon: OfficeBuildingIcon,
      current: false,
    },
  ];
  const { user } = useAuth();

  const JsxIsJobLoading = () => {
    return (
      <div>
        <ul role="list" className="space-y-4">
          <div className="overflow-hidden sm:rounded-md dark:shadow-slate-800">
            <div className="bg-white rounded-lg shadow dark:bg-slate-800">
              <div className="p-8">
                <div className="flex items-center justify-center dark:text-white gap-3">
                  <CircularProgress /> Loading...
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    );
  };

  const JsxAfterLoading = () => {
    return (
      <div>
        <ul role="list" className="space-y-4">
          <div className="overflow-hidden sm:rounded-md shadow-md dark:shadow-slate-800">
            <ul role="list" className="divide-y divide-gray-200">
              <Suspense fallback={<LinearProgress />}>
                <section aria-labelledby="who-to-follow-heading">
                  <div className="bg-white rounded-lg shadow dark:bg-slate-800">
                    <div className="p-6">
                      {!jobs?.title &&
                      !jobs?.company?.companyName &&
                      !jobs?.location &&
                      !jobs?.jobCondition &&
                      !jobs?.createdAt &&
                      !jobs?.jobApplications?.length ? (
                        <>
                          <Skeleton variant="rounded" height={150} />
                        </>
                      ) : (
                        <>
                          <h2 className="text-base font-medium text-gray-900 dark:text-white">
                            {jobs?.title}
                          </h2>
                          <small className="dark:text-white">
                            {jobs?.company?.companyName} - {jobs?.location} (
                            {jobs?.jobCondition}){" "}
                            <span className="text-green-500">
                              {format(jobs?.createdAt)}
                            </span>{" "}
                            - {jobs?.jobApplications?.length} Applicants
                          </small>
                        </>
                      )}
                      <div className="pb-6 space-y-1 mt-4">
                        {!jobs?.jobType &&
                        !jobs?.company?.companyMembers.length ? (
                          <>
                            <Skeleton variant="text" width={200} height={20} />
                            <Skeleton variant="text" width={200} height={20} />
                          </>
                        ) : (
                          navigation.map((item, index) => (
                            <div
                              key={index}
                              className={classNames(
                                "group flex items-center px-1 py-2 text-xs rounded-md dark:text-white"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              <item.icon
                                className={classNames(
                                  "flex-shrink-0 -ml-1 mr-3 h-5 w-5 dark:text-white"
                                )}
                                aria-hidden="true"
                              />
                              <span className="truncate">{item.name}</span>
                            </div>
                          ))
                        )}

                        {!jobs?.hiddenSalary && (
                          <div
                            className={classNames(
                              "group flex items-center px-1 py-2 text-xs rounded-md dark:text-white"
                            )}
                          >
                            {jobs?.salary && (
                              <>
                                <CashIcon
                                  className={classNames(
                                    "flex-shrink-0 -ml-1 mr-3 h-5 w-5 dark:text-white"
                                  )}
                                  aria-hidden="true"
                                />
                                <span className="truncate">
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  }).format(jobs?.salary)}{" "}
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {jobs.applicants?.some(
                          (applicants) => applicants.userId === user._id
                        ) ? (
                          <button
                            type="button"
                            onClick={() => {}}
                            className="truncate inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          >
                            My Applications
                            <EyeIcon
                              className="ml-2 -mr-0.5 h-4 w-4"
                              aria-hidden="true"
                            />
                          </button>
                        ) : !jobs?.title ? (
                          <Skeleton variant="rounded" width={200} height={20} />
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setJobApply(jobs);
                                setOpen(true);
                              }}
                              className="truncate inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Apply Now
                              <ExternalLinkIcon
                                className="ml-2 -mr-0.5 h-4 w-4"
                                aria-hidden="true"
                              />
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 dark:border bg-gray-700 hover:bg-gray-800 border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-transparent hover:bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Save
                              <SaveIcon
                                className="ml-2 -mr-0.5 h-4 w-4"
                                aria-hidden="true"
                              />
                            </button>
                          </>
                        )}
                      </div>
                      <div className="mt-4">
                        <span className="dark:text-white">
                          {jobs?.requirements && "Requirements: "}{" "}
                        </span>
                        <p className="dark:text-white/80">
                          {jobs?.requirements || (
                            <Skeleton variant="rounded" height={300} />
                          )}
                        </p>
                      </div>

                      <div className="mt-6 flow-root">
                        <ul
                          role="list"
                          className="-my-4 divide-y divide-gray-200"
                        >
                          <div className="bg-white overflow-hidden rounded-md dark:bg-transparent">
                            {jobs?.hiddenSalary && <InformationSalary />}
                            {!jobs?.title ? (
                              <Skeleton variant="rounded" height={150} />
                            ) : (
                              <AboutCompany jobs={jobs} />
                            )}
                          </div>
                        </ul>
                      </div>
                      <div className="mt-12">
                        <div className="cursor-pointer w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-slate-700 dark:border-2 dark:border-slate-700 dark:text-white dark:highlight-white/5 dark:hover:bg-slate-800">
                          See more...
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Suspense>
            </ul>
          </div>
        </ul>
      </div>
    );
  };

  return isJobLoading ? <JsxIsJobLoading /> : <JsxAfterLoading />;
};

export default JobDetail;
