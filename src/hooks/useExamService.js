import { useApi } from "./useApi";

export const useExamService = () => {
  const [requests] = useApi();

  const examService = {
    create: (exams) => requests.post("/api/GreateExam", exams),
    getAll: () =>
      requests.get(
        "/api/Exams",
        "RuxUOy82WoGlTV7pI0VtFdfF9V580XmusaPuzysyh5JQAzFuyVzODw=="
      ),
  };
  return [examService];
};
