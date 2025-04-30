/**
 * @name SQL injection
 * @description Using unsanitized user input in a SQL query can lead to SQL injection.
 * @kind path-problem
 * @problem.severity error
 * @security-severity 9.8
 * @precision high
 * @id js/sql-injection
 * @tags security
 *       external/cwe/cwe-089
 */

import javascript
import DataFlow::PathGraph
import semmle.javascript.security.dataflow.SqlInjectionQuery

from Configuration cfg, DataFlow::PathNode source, DataFlow::PathNode sink
where cfg.hasFlowPath(source, sink)
select sink.getNode(), source, sink, "This query depends on $@, which may contain SQL statements.",
  source.getNode(), "a user-provided value"
