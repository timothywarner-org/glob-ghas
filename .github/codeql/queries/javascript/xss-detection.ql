/**
 * @name Cross-site scripting vulnerability
 * @description Using unsanitized user input in HTML context can lead to XSS.
 * @kind path-problem
 * @problem.severity error
 * @security-severity 8.8
 * @precision high
 * @id js/xss
 * @tags security
 *       external/cwe/cwe-079
 */

import javascript
import DataFlow::PathGraph
import semmle.javascript.security.dataflow.DomBasedXssQuery

from Configuration cfg, DataFlow::PathNode source, DataFlow::PathNode sink
where cfg.hasFlowPath(source, sink)
select sink.getNode(), source, sink, "Cross-site scripting vulnerability due to $@.",
  source.getNode(), "user-provided value"
