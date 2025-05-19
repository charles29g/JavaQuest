import React from "react";
import "./Design.css";
import LandingNavbar from "./landingNavbar";

const modules = [
  {
    title: "Module 1: Introduction to Java & Syntax",
    sources: [
      {
        title: "Java Introduction",
        url: "https://www.w3schools.com/java/java_intro.asp",
      },
      {
        title: "JDK vs. JRE vs. JVM: Key differences",
        url: "https://www.ibm.com/think/topics/jvm-vs-jre-vs-jdk#:~:text=JDK%20is%20the%20development%20platform,won't%20run%20without%20it",
      },
      {
        title: "What is the structure of a java program?",
        url: "https://ethans.co.in/blogs/what-is-the-structure-of-a-java-program/",
      },
      {
        title: "Java main() Method",
        url: "https://codegym.cc/groups/posts/java-main-method",
      },
      {
        title: "System.out.println in Java",
        url: "https://www.tutorialspoint.com/system-out-println-in-java",
      },
      {
        title: "Java Comments",
        url: "https://www.w3schools.com/java/java_comments.asp",
      },
      {
        title: "Java Basic Syntax",
        url: "https://www.tutorialspoint.com/java/java_basic_syntax.htm",
      },
    ],
  },
  {
    title: "Module 2: Variables & Data Types",
    sources: [
      {
        title: "Declaring, Instantiating and Initializing an Object",
        url: "https://www.cs.princeton.edu/courses/archive/spr96/cs333/java/tutorial/java/anatomy/creating.html",
      },
      {
        title: "Java Data Types",
        url: "https://www.datacamp.com/doc/java/java-data-types",
      },
      {
        title: "Java Strings",
        url: "https://www.w3schools.com/java/java_strings.asp",
      },
      {
        title: "Java Arrays",
        url: "https://www.w3schools.com/java/java_arrays.asp",
      },
      {
        title: "Type Casting in Java",
        url: "https://www.geekster.in/articles/type-casting-java/",
      },
      {
        title: "Java Constants",
        url: "https://bito.ai/resources/java-constants-file-java-explained/",
      },
      {
        title: "Java User Input (Scanner)",
        url: "https://www.w3schools.com/java/java_user_input.asp",
      },
    ],
  },
  {
    title: "Module 3: Conditional Statements (if-else, switch)",
    sources: [
      {
        title: "Conditional Statements in Java (If-Else Statement)",
        url: "https://www.naukri.com/code360/library/what-are-conditional-statements-in-java",
      },
      {
        title: "Java - Relational Operators",
        url: "https://www.tutorialspoint.com/java/java_relational_operators_examples.htm",
      },
      {
        title: "Java - Logical Operators",
        url: "https://www.tutorialspoint.com/java/java_logical_operators_examples.htm",
      },
      {
        title: "Java Switch",
        url: "https://www.w3schools.com/java/java_switch.asp",
      },
    ],
  },
  {
    title: "Module 4: Loops (for, while, do-while)",
    sources: [
      {
        title: "Java For Loop",
        url: "https://www.w3schools.com/java/java_for_loop.asp",
      },
      {
        title: "Java While Loop",
        url: "https://www.w3schools.com/java/java_while_loop.asp",
      },
      {
        title: "Java Do/While Loop",
        url: "https://www.w3schools.com/java/java_while_loop_do.asp",
      },
      {
        title: "Java Nested Loops",
        url: "https://codegym.cc/groups/posts/java-nested-loops",
      },
    ],
  },
  {
    title: "Module 5: Methods & Functions",
    sources: [
      {
        title: "Java Methods",
        url: "https://www.w3schools.com/java/java_methods.asp",
      },
      {
        title: "Java Method Parameters",
        url: "https://www.w3schools.com/java/java_methods_param.asp",
      },
      {
        title: "Java Return",
        url: "https://www.w3schools.com/java/java_methods_return.asp",
      },
      {
        title: "Java Method Overloading",
        url: "https://www.w3schools.com/java/java_methods_overloading.asp",
      },
      {
        title: "Java Scope",
        url: "https://www.w3schools.com/java/java_scope.asp",
      },
      {
        title: "Java Recursion",
        url: "https://www.w3schools.com/java/java_recursion.asp",
      },
    ],
  },
  {
    title: "Module 6: Object-Oriented Programming (OOP) Basics",
    sources: [
      {
        title: "Java Classes and Objects",
        url: "https://www.datacamp.com/doc/java/classes-and-objects",
      },
      {
        title: "Java Constructors",
        url: "https://www.w3schools.com/java/java_constructors.asp",
      },
      {
        title: "this Keyword in Java",
        url: "https://www.datacamp.com/doc/java/this",
      },
      {
        title: "Getters And Setters In Java",
        url: "https://akadar899.medium.com/getters-and-setters-in-java-a27b39b0bb23",
      },
      {
        title: "Java Inheritance",
        url: "https://www.w3schools.com/java/java_inheritance.asp",
      },
      {
        title: "Java - Overriding",
        url: "https://www.tutorialspoint.com/java/java_overriding.htm",
      },
    ],
  },
];

function References() {
  return (      
    <div className="landpg-navbar">
      <LandingNavbar/>     
    <div className="references-section">
      <div className="references-overlay">
        <h2 className="references-heading">Resources</h2>
        <p className="references-subtext">
          These are the sources we used to create the learning modules in{" "}
          <strong>JavaQuest</strong>.
        </p>

        {modules.map((module, idx) => (
          <div className="module-box" key={idx}>
            <h3 className="module-title">{module.title}</h3>
            <ul className="module-list">
              {module.sources.map((source, i) => (
                <li key={i}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </div> 
  );
}

export default References;
