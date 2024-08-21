"use client"
import React, { useState } from 'react';
import { MathpixMarkdownModel as MM } from 'mathpix-markdown-it';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [parsedQuestions, setParsedQuestions] = useState<string[]>([]);
  const [parsedAnswers, setParsedAnswers] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { parsedText, questions, answers } = parseCustomSyntax(value);
    setParsedQuestions(questions);
    setParsedAnswers(answers);

    const result = MM.markdownToHTML(parsedText);
    document.getElementById('preview-content')!.innerHTML = result;
  };

  const parseCustomSyntax = (text: string): { parsedText: string; questions: string[]; answers: string[] } => {
    const questionRegex = /\\begin{question}([\s\S]*?)\\end{question}/g;
    const answerRegex = /\\begin{answer}([\s\S]*?)\\end{answer}/g;

    let questions: string[] = [];
    let answers: string[] = [];

    // Extract questions
    text = text.replace(questionRegex, (match, question) => {
      questions.push(question.trim());
      return `**Q: ${question.trim()}**`;
    });

    // Extract answers
    text = text.replace(answerRegex, (match, answer) => {
      answers.push(answer.trim());
      return `**A: ${answer.trim()}**`;
    });

    return { parsedText: text, questions, answers };
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.header}>Input Text with LaTeX:</h1>
        <textarea value={value} onChange={handleChange} style={styles.textarea} />
        <input type="submit" value="Convert" style={styles.button} />
      </form>
      <div id="preview-content" style={styles.previewContent} />

      {/* Display parsed questions and answers */}
      <div style={styles.qaContainer}>
        <h2 style={styles.qaHeader}>Parsed Questions</h2>
        <ul style={styles.qaList}>
          {parsedQuestions.map((q, index) => (
            <li key={index} style={styles.qaItem}>
              Q{index + 1}: {q}
            </li>
          ))}
        </ul>
        <h2 style={styles.qaHeader}>Parsed Answers</h2>
        <ul style={styles.qaList}>
          {parsedAnswers.map((a, index) => (
            <li key={index} style={styles.qaItem}>
              A{index + 1}: {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    height: '150px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  previewContent: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    marginBottom: '20px',
  },
  qaContainer: {
    marginTop: '20px',
  },
  qaHeader: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  qaList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  qaItem: {
    padding: '10px',
    backgroundColor: '#f1f1f1',
    borderRadius: '4px',
    marginBottom: '5px',
  },
};

export default Editor;
