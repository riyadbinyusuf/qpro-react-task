import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useSearchParams } from "react-router";
import React, { useMemo } from "react";

import type { Todo, User } from "@/utils/types";
import { fetchTodos } from "@/services/todos";
import styles from "./todos.module.css";

export default function Todos() {
  const userList: User[] = useLoaderData();

  let users: Record<string, User> = useMemo(() => {
    let usersObj: Record<string, User> = {};
    if (userList?.length > 0) {
      usersObj = userList.reduce((acc: Record<string, User>, cur: User) => {
        acc[cur.id] = cur;
        return acc;
      }, usersObj);
    }
    return usersObj;
  }, [userList]);

  const [searchParams, setSearchParams] = useSearchParams({
    _page: "1",
    _limit: "10",
  });
  const currentPage = searchParams.get("_page") ?? 1;
  const limit = searchParams.get("_limit") ?? 10;
  const userId = searchParams.get("userId") ?? "all";
  const status = searchParams.get("completed") ?? "All";
  const filterString = searchParams.toString();

  const { data, isLoading } = useQuery({
    queryKey: ["todos", filterString],
    queryFn: fetchTodos,
  });

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const current =
      typeof currentPage === "string" ? parseInt(currentPage) : currentPage;
    const nextPage = (current + 1).toString();
    searchParams.set("_page", nextPage);
    setSearchParams(searchParams);
  };
  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const current =
      typeof currentPage === "string" ? parseInt(currentPage) : currentPage;
    const nextPage = current > 2 ? (current - 1).toString() : "1";
    searchParams.set("_page", nextPage);
    setSearchParams(searchParams);
  };
  const handleChangeSearchParams = (key: string, value: string) => {
    searchParams.set(key, value);
    if (key === "_limit") {
      searchParams.set("_page", "1");
    }
    setSearchParams(searchParams);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const isExists = ["completed", "pending"].includes(val);

    const isCompleted = isExists && val === "completed";

    if (isExists) {
      searchParams.set("completed", isCompleted.toString());
    } else {
      searchParams.delete("completed");
    }
    searchParams.set("_page", "1");
    setSearchParams(searchParams);
  };

  const handleUserFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "all") {
      searchParams.delete("userId");
    } else {
      searchParams.set("userId", val);
    }
    searchParams.set("_page", "1");
    setSearchParams(searchParams);
  };

  return (
    <>
      <main>
        {/* todo filter */}
        <div className={styles["flex-row"]}>
          <div className={styles.per_page}>
            <div className="goto">Status</div>
            <div className="">
              <select onChange={handleStatusFilter} value={status ?? ""}>
                {["All", "completed", "pending"].map((status) => {
                  return (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.per_page}>
            <div className="goto">Users</div>
            <div className="">
              <select onChange={handleUserFilter} value={userId}>
                <option disabled>Select user</option>
                <option value="all">All</option>
                {userList &&
                  userList.map((user: User) => {
                    return (
                      <option value={user.id} key={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="">
              <button
                type="button"
                onClick={() => {
                  setSearchParams({
                    _page: "1",
                    _limit: "10",
                  });
                }}
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
        {/* todo list */}
        <table className={styles.tbl}>
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <tr>
                  <td></td>
                  <td>Loading...</td>
                  <td></td>
                </tr>
              </>
            ) : null}
            {data &&
              data.map((todo: Todo) => {
                return (
                  <React.Fragment key={todo.id}>
                    <tr>
                      <td>{todo.title}</td>
                      <td>{users[todo.userId]?.name ?? ""}</td>
                      <td className={todo.completed ? styles.completed : ""}>
                        {todo.completed ? "completed" : "pending"}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
        {/* todo pagination */}
        <div className={styles.pagination}>
          <button
            type="button"
            className="prev"
            role="button"
            onClick={handlePrev}
          >
            Prev
          </button>
          <div className="">{searchParams.get("_page") ?? 1}</div>
          <button
            type="button"
            className="next"
            role="button"
            onClick={handleNext}
          >
            Next
          </button>
          <div className={styles.goto}>
            <div className="goto">Go to</div>
            <div className="">
              <input
                type="number"
                value={currentPage}
                step={1}
                onChange={(e) =>
                  handleChangeSearchParams("_page", e.target.value)
                }
                size={3}
              />
            </div>
          </div>
          <div className={styles.per_page}>
            <div className="goto">Per page</div>
            <div className="">
              <select
                onChange={(e) =>
                  handleChangeSearchParams("_limit", e.target.value)
                }
                value={limit}
              >
                {[10, 20, 50].map((limit) => {
                  return (
                    <option key={limit} value={limit}>
                      {limit}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
