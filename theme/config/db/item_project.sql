CREATE TABLE `SITE_DB`.`item_project` (
  `id` int(11) NOT NULL auto_increment,
  `item_id` int(11) NOT NULL,

  `name` varchar(100) NOT NULL,
  `classname` varchar(50) NOT NULL DEFAULT '',
  `description` text NOT NULL DEFAULT '',
  `html` text NOT NULL DEFAULT '',
  `projectdetails` text NOT NULL DEFAULT '',

  `position` int(11) DEFAULT '0',

  PRIMARY KEY  (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_project_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `SITE_DB`.`items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
